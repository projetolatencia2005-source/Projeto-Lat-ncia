import { basename, dirname, join } from "path";
import { useCallback, useEffect, useRef, useState } from "react";
import StyledPaint from "components/apps/Paint/StyledPaint";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledLoading from "components/system/Apps/StyledLoading";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import useTitle from "components/system/Window/useTitle";
import { useFileSystemActions } from "contexts/fileSystem";
import { useProcess, useProcessesActions } from "contexts/process";
import { useForegroundId, useSessionActions } from "contexts/session";
import { type WallpaperFit } from "contexts/session/types";
import {
  DESKTOP_PATH,
  IFRAME_CONFIG,
  ONE_TIME_PASSIVE_EVENT,
  PICUTRES_PATH,
} from "utils/constants";
import { installDoorsCursorStyles } from "utils/doorsCursor";
import { blobToBuffer } from "utils/functions";

type JsPaint = {
  close: () => void;
  file_new: () => void;
  onunhandledrejection: (
    error: Error & { reason: { message: string } }
  ) => void;
  open_from_file: (file: File, fileHandle: string) => void;
  storage_quota_exceeded: () => void;
  systemHooks: {
    setWallpaperCentered: (canvas: HTMLCanvasElement) => void;
    setWallpaperTiled: (canvas: HTMLCanvasElement) => void;
    showOpenFileDialog: (props: {
      formats: unknown[];
    }) => Promise<{ file: File }>;
    showSaveFileDialog: (props: {
      defaultFileName: string;
      getBlob: (mimeType: string) => Promise<Blob>;
    }) => void;
    writeBlobToHandle: (fileHandle: string, blob: Blob) => Promise<void>;
  };
};

const DOORS_PAINT_STYLES = `
  @font-face {
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    src: url("/System/Doors/figma/PixelifySans-Latin.woff2") format("woff2");
  }

  body {
    --ActiveTitle: #7D94B8;
    --GradientActiveTitle: #7D94B8;
    --InactiveTitle: #7D94B8;
    --GradientInactiveTitle: #7D94B8;
    --ButtonFace: #D7E4F7;
    --AppWorkspace: #D7E4F7;
    --Menu: #dce5f0;
    --MenuText: #202b3b;
    --ButtonText: #202b3b;
    --GrayText: #53657b;
  }

  .os-window:not(.tool-window) .window-titlebar,
  body > .window-titlebar {
    background: #7D94B8 !important;
    color: #fff !important;
  }

  .os-window:not(.tool-window) .window-titlebar .window-button {
    transform: translateY(-2px);
  }

  body,
  .jspaint,
  .canvas-area {
    background: #D7E4F7 !important;
  }

  .menus {
    align-items: center;
    background: #dce5f0 !important;
    border-bottom: 2px solid #8395ad;
    color: #202b3b !important;
    display: flex;
    height: 36px;
    min-height: 36px;
    padding: 0 4px;
  }

  .menus *,
  .menu-popup * {
    font-family: "Pixelify Sans", sans-serif !important;
    font-size: 15px !important;
  }

  .menus .menu-button {
    align-items: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    clip-path: none;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0 11px;
  }

  .menus .menu-button:hover,
  .menus .menu-button.highlight {
    background: #edf3fa;
    border-color: #8b9cb3;
  }
`;

const Paint: FC<ComponentProcessProps> = ({ id }) => {
  const { closeWithTransition } = useProcessesActions();
  const {
    libs: [paintSrc = ""] = [],
    title: windowTitle,
    url = "",
  } = useProcess(id);
  const { createPath, exists, readFile, updateFolder, writeFile } =
    useFileSystemActions();
  const { setForegroundId, setWallpaper } = useSessionActions();
  const foregroundId = useForegroundId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [jsPaintInstance, setJsPaintInstance] = useState<JsPaint>();
  const { prependFileToTitle } = useTitle(id);
  const handlePaintLoad = useCallback((): void => {
    const paintDocument = iframeRef.current?.contentDocument;
    const jsPaint = iframeRef.current?.contentWindow as
      | (JsPaint & { systemHooks?: JsPaint["systemHooks"] })
      | undefined;

    if (
      !jsPaint ||
      typeof jsPaint.file_new !== "function" ||
      typeof jsPaint.systemHooks?.showOpenFileDialog !== "function"
    ) {
      setLoadError(true);
      setLoaded(true);
      return;
    }

    if (
      paintDocument?.head &&
      !paintDocument.querySelector("#doors-paint-styles")
    ) {
      const style = paintDocument.createElement("style");

      style.id = "doors-paint-styles";
      style.textContent = DOORS_PAINT_STYLES;
      paintDocument.head.append(style);
    }

    installDoorsCursorStyles(paintDocument || null);
    setLoadError(false);
    setLoaded(true);
  }, []);
  const setWallpaperFromCanvas =
    (fit: WallpaperFit) =>
    (canvas: HTMLCanvasElement): void => {
      const wallpaperPath = join(PICUTRES_PATH, "wallpaper.png");

      canvas.toBlob(async (blob) => {
        await writeFile(wallpaperPath, await blobToBuffer(blob), true);
        setWallpaper(wallpaperPath, fit);
      });
    };
  const { onDragOver, onDrop } = useFileDrop({ id });

  useEffect(() => {
    prependFileToTitle("Untitled");
  }, [prependFileToTitle]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (foregroundId !== id) {
      const onClick = (): void => setForegroundId(id);
      const contentWindow = iframeRef.current?.contentWindow;

      contentWindow?.addEventListener("click", onClick, ONE_TIME_PASSIVE_EVENT);

      cleanup = () => contentWindow?.removeEventListener("click", onClick);
    }

    return cleanup;
  }, [foregroundId, id, setForegroundId]);

  useEffect(() => {
    const { contentWindow } = iframeRef.current || {};
    let cleanup: (() => void) | undefined;

    if (loaded && !loadError && contentWindow && !jsPaintInstance) {
      const candidate = contentWindow as unknown as Partial<JsPaint>;

      if (
        typeof candidate.file_new !== "function" ||
        typeof candidate.systemHooks?.showOpenFileDialog !== "function"
      ) {
        setLoadError(true);
        return;
      }

      const jsPaint = candidate as JsPaint;
      const previousOpenFileDialog = jsPaint.systemHooks.showOpenFileDialog;
      const previousFileNew = jsPaint.file_new;

      setJsPaintInstance(jsPaint);

      jsPaint.file_new = () => {
        prependFileToTitle("Untitled");
        previousFileNew();
      };
      jsPaint.systemHooks.setWallpaperTiled = setWallpaperFromCanvas("tile");
      jsPaint.systemHooks.setWallpaperCentered =
        setWallpaperFromCanvas("center");
      jsPaint.systemHooks.showOpenFileDialog = async (props) => {
        const { file } = await previousOpenFileDialog(props);

        prependFileToTitle(file.name);

        return { file };
      };
      jsPaint.close = () => closeWithTransition(id);
      jsPaint.storage_quota_exceeded = () => {
        // Ignore Storage Warning
      };
      jsPaint.systemHooks.showSaveFileDialog = async ({
        defaultFileName,
        getBlob,
      }) =>
        updateFolder(
          DESKTOP_PATH,
          await createPath(
            `${defaultFileName}.png`,
            DESKTOP_PATH,
            await blobToBuffer(await getBlob("image/png"))
          )
        );
      jsPaint.systemHooks.writeBlobToHandle = async (fileHandle, blob) => {
        if (await exists(fileHandle)) {
          await writeFile(fileHandle, await blobToBuffer(blob), true);
          updateFolder(dirname(fileHandle), basename(fileHandle));
        }
      };

      contentWindow.addEventListener("dragover", onDragOver);
      contentWindow.addEventListener("drop", onDrop);

      cleanup = () => {
        contentWindow.removeEventListener("dragover", onDragOver);
        contentWindow.removeEventListener("drop", onDrop);
      };
    }

    return cleanup;
  }, [
    closeWithTransition,
    createPath,
    exists,
    id,
    jsPaintInstance,
    loaded,
    loadError,
    onDragOver,
    onDrop,
    prependFileToTitle,
    setLoadError,
    setWallpaperFromCanvas,
    updateFolder,
    writeFile,
  ]);

  useEffect(() => {
    if (jsPaintInstance && url) {
      readFile(url).then((buffer) => {
        // eslint-disable-next-line prefer-destructuring
        const onunhandledrejection = jsPaintInstance.onunhandledrejection;

        jsPaintInstance.onunhandledrejection = (error) => {
          onunhandledrejection?.(error);

          if (
            error?.reason?.message ===
            "either options.data or options.file or options.filePath must be passed"
          ) {
            prependFileToTitle("Untitled");
          }
        };
        jsPaintInstance.open_from_file(
          new File([buffer as BlobPart], url),
          url
        );
        prependFileToTitle(basename(url));
      });
    }
  }, [jsPaintInstance, prependFileToTitle, readFile, url]);

  return (
    <StyledPaint $loaded={loaded}>
      {!loaded && <StyledLoading className="loading" />}
      {loadError && (
        <p
          role="alert"
          style={{
            background: "#dce5f0",
            border: "2px solid #31302c",
            color: "#202b3b",
            left: "50%",
            maxWidth: "calc(100% - 24px)",
            padding: "12px",
            position: "absolute",
            textAlign: "center",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          Não foi possível carregar o Rabisco. Atualize a página e tente
          novamente.
        </p>
      )}
      {paintSrc && (
        <iframe
          ref={iframeRef}
          // Busy on the content only, never on an ancestor of the
          // role="status" loader or its announcement may be withheld
          aria-busy={!loaded || undefined}
          height="100%"
          id={`jspaint-${id}`}
          onLoad={handlePaintLoad}
          src={paintSrc}
          style={loadError ? { visibility: "hidden" } : undefined}
          title={windowTitle}
          width="100%"
          {...IFRAME_CONFIG}
        />
      )}
    </StyledPaint>
  );
};

export default Paint;
