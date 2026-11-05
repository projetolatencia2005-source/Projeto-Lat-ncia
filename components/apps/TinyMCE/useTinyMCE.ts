import { basename, dirname, extname } from "path";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { type Editor, type NotificationSpec } from "tinymce";
import { config, DEFAULT_SAVE_PATH } from "components/apps/TinyMCE/config";
import {
  draggableEditor,
  isPostItPath,
  setReadOnlyMode,
} from "components/apps/TinyMCE/functions";
import { type IRTFJS } from "components/apps/TinyMCE/types";
import { type ContainerHookProps } from "components/system/Apps/AppContainer";
import { getModifiedTime } from "components/system/Files/FileEntry/functions";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import useTitle from "components/system/Window/useTitle";
import { useFileSystemActions } from "contexts/fileSystem";
import { useProcess, useProcessesActions } from "contexts/process";
import { useSessionActions } from "contexts/session";
import { useLinkHandler } from "hooks/useLinkHandler";
import {
  DEFAULT_LOCALE,
  DEFAULT_SCROLLBAR_WIDTH,
  ONE_TIME_PASSIVE_EVENT,
} from "utils/constants";
import { installDoorsCursorStyles } from "utils/doorsCursor";
import { getExtension, loadFiles } from "utils/functions";

const TITLE_DATE_FORMATTER = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  dateStyle: "medium",
});

const loadRtfJs = (): Promise<unknown> => import("rtf.js");

const scrollEditorToTop = (editor: Editor): void => {
  const contentDocument = editor.iframeElement?.contentDocument;

  if (contentDocument) contentDocument.documentElement.scrollTop = 0;
};

type TinyMCEHookOptions = {
  contentStyle?: string;
  editable?: boolean;
  menubar?: false | string;
  plugins?: string;
  savePath?: string;
  statusbar?: boolean;
  toolbar?: false | string;
  transformContent?: (content: string, url: string) => string;
};

const useTinyMCE = (
  { containerRef, id, setLoading, url }: ContainerHookProps,
  options: TinyMCEHookOptions = {}
): Editor | undefined => {
  const { url: setUrl } = useProcessesActions();
  const { libs = [] } = useProcess(id);
  const [editor, setEditor] = useState<Editor>();
  const { prependFileToTitle } = useTitle(id);
  const { readFile, stat, updateFolder, writeFile } = useFileSystemActions();
  const { onDragOver, onDrop } = useFileDrop({ id });
  const { setForegroundId } = useSessionActions();
  const updateTitle = useCallback(
    async (currentUrl: string): Promise<void> => {
      const modifiedDate = new Date(
        getModifiedTime(currentUrl, await stat(currentUrl))
      );
      const date = TITLE_DATE_FORMATTER.format(modifiedDate);

      prependFileToTitle(
        `${basename(currentUrl, extname(currentUrl))} (${date})`
      );
    },
    [prependFileToTitle, stat]
  );
  const openLink = useLinkHandler();
  const isPostIt = isPostItPath(url);
  const isEditable = options.editable ?? isPostIt;
  const savePath = options.savePath || DEFAULT_SAVE_PATH;
  const linksToProcesses = useCallback((): void => {
    const iframe = containerRef.current?.querySelector("iframe");

    if (iframe?.contentWindow) {
      [...iframe.contentWindow.document.links].forEach((link) =>
        link.addEventListener("click", (event) => {
          if (editor?.mode.isReadOnly()) {
            openLink(
              event,
              link.dataset.mceHref || "",
              link.pathname,
              link.textContent || ""
            );
          }
        })
      );
    }
  }, [containerRef, editor, openLink]);
  const loadFile = useCallback(async (): Promise<void> => {
    if (editor) {
      const setupSaveCallback = (): void => {
        editor.options.set("save_onsavecallback", async () => {
          const saveSpec: NotificationSpec & {
            closeButton: boolean; // V6 Spec
          } = {
            closeButton: true,
            text: "Successfully saved.",
            timeout: 5000,
            type: "success",
          };
          const saveUrl = url || savePath;
          const writeUrl =
            getExtension(saveUrl) === ".rtf"
              ? saveUrl.replace(".rtf", ".whtml")
              : saveUrl;

          try {
            await writeFile(writeUrl, editor.getContent(), true);
            updateFolder(dirname(saveUrl), basename(saveUrl));
            updateTitle(saveUrl);
          } catch {
            saveSpec.text = "Error occurred while saving.";
            saveSpec.type = "error";
          }

          editor.notificationManager.open(saveSpec);

          const notification =
            editor.notificationManager.getNotifications()?.[0];
          const toast = notification?.getEl()?.parentElement;
          const mceContainer = editor.editorContainer;

          if (
            toast instanceof HTMLElement &&
            mceContainer instanceof HTMLElement
          ) {
            // TinyMCE's own reposition moves the toast back out & restyles it
            notification.reposition = () => {
              mceContainer.append(toast);
              toast.setAttribute(
                "style",
                "position: absolute; right: 0; bottom: 0; padding: 33px 25px;"
              );
              toast
                .querySelector("[role=alert]")
                ?.setAttribute("style", "opacity: 1;");
            };
            notification.reposition();
            // TinyMCE only handles clicks from within its own container
            toast
              .querySelector("button")
              ?.addEventListener(
                "click",
                notification.close,
                ONE_TIME_PASSIVE_EVENT
              );
          }

          if (saveUrl === savePath) updateTitle(saveUrl);
        });
      };
      const fileContents = url ? await readFile(url) : Buffer.from("");
      let htmlContent = fileContents.toString();

      if (url && options.transformContent) {
        const transformedContent = options.transformContent(htmlContent, url);

        if (transformedContent !== htmlContent) {
          htmlContent = transformedContent;

          try {
            await writeFile(url, transformedContent, true);
            updateFolder(dirname(url), basename(url));
          } catch {
            // Show the current template even if the local file cannot be migrated.
          }
        }
      }

      if (htmlContent.length === 0) {
        editor.mode.set("design");
        setupSaveCallback();
      } else {
        if (getExtension(url) === ".rtf") {
          const { RTFJS } = (await loadRtfJs()) as IRTFJS;
          const rtfDoc = new RTFJS.Document(fileContents);
          const rtfHtml = await rtfDoc.render();

          editor.setContent(
            rtfHtml.map((domElement) => domElement.outerHTML).join("")
          );
        } else {
          editor.setContent(htmlContent);
        }

        if (isEditable) {
          editor.mode.set("design");
          setupSaveCallback();
        } else {
          setReadOnlyMode(editor, setupSaveCallback);
          linksToProcesses();
        }

        scrollEditorToTop(editor);
      }

      if (url) updateTitle(url);
    }
  }, [
    editor,
    isEditable,
    linksToProcesses,
    options,
    readFile,
    savePath,
    updateFolder,
    updateTitle,
    url,
    writeFile,
  ]);
  const initEditor = useRef(false);
  const loadFileRef = useRef(loadFile);

  useEffect(() => {
    loadFileRef.current = loadFile;
  }, [loadFile]);

  useEffect(() => {
    if (!editor && !initEditor.current) {
      initEditor.current = true;

      loadFiles(libs).then(() => {
        if (window.tinymce && containerRef.current) {
          window.tinymce
            .init({
              readonly: Boolean(url) && !isEditable,
              selector: `.${[...containerRef.current.classList].join(".")} div[id="${id}"]`,
              setup: (editorInstance) => {
                editorInstance.on("ExecCommand", ({ command }) => {
                  if (command === "mceNewDocument") {
                    setUrl(id, "");
                    prependFileToTitle("");
                  }
                });
              },
              ...config,
              content_style:
                options.contentStyle ??
                (isPostIt
                  ? `@font-face { font-family: "Pixelify Sans"; src: url("/System/Doors/figma/PixelifySans-Latin.woff2") format("woff2"); } body { background: #e1edff; color: #31302c; font-family: "Pixelify Sans", sans-serif; font-size: 16px; margin: 0; padding: 20px; } p { margin: 0; }`
                  : undefined),
              menubar: options.menubar ?? (isPostIt ? false : undefined),
              plugins: options.plugins ?? config.plugins,
              statusbar: options.statusbar ?? (isPostIt ? false : undefined),
              toolbar: options.toolbar ?? (isPostIt ? false : config.toolbar),
            })
            .then(([activeEditor]) => {
              const iframe = containerRef.current?.querySelector("iframe");

              if (iframe?.contentWindow) {
                installDoorsCursorStyles(iframe.contentDocument);
                iframe.contentWindow.addEventListener("dragover", (event) => {
                  if (draggableEditor(activeEditor)) onDragOver(event);
                });
                iframe.contentWindow.addEventListener("drop", (event) => {
                  if (draggableEditor(activeEditor)) onDrop(event);
                });
                iframe.contentWindow.addEventListener("blur", () =>
                  setForegroundId((currentForegroundId) =>
                    currentForegroundId === id ? "" : currentForegroundId
                  )
                );
                iframe.contentWindow.addEventListener("focus", () =>
                  setForegroundId(id)
                );
                iframe.contentWindow.addEventListener(
                  "mousedown",
                  ({ pageX }) =>
                    iframe.contentWindow &&
                    pageX >
                      iframe.contentWindow.innerWidth -
                        DEFAULT_SCROLLBAR_WIDTH &&
                    setForegroundId(id)
                );
              }

              setEditor(activeEditor);
              setLoading(false);
            });
        }
      });
    }
  }, [
    containerRef,
    editor,
    id,
    isEditable,
    isPostIt,
    libs,
    options.contentStyle,
    options.menubar,
    options.plugins,
    onDragOver,
    onDrop,
    prependFileToTitle,
    setForegroundId,
    setLoading,
    setUrl,
    options.statusbar,
    options.toolbar,
    url,
  ]);

  useEffect(() => {
    if (editor) void loadFileRef.current();
    // The URL triggers document reloads through the latest callback in the ref.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies -- This URL dependency is an intentional reload signal.
  }, [editor, url]);

  // Layout cleanup runs before the window leaves the DOM, Firefox throws if
  // TinyMCE tears down after its iframe is detached
  useLayoutEffect(() => () => editor?.destroy(), [editor]);

  return editor;
};

export default useTinyMCE;
