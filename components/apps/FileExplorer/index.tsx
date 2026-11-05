import { basename, dirname } from "path";
import { useEffect, useRef } from "react";
import ExplorerMenuBar from "components/apps/FileExplorer/ExplorerMenuBar";
import Navigation from "components/apps/FileExplorer/Navigation";
import QuickAccessSidebar, {
  getExplorerDirectoryLabel,
} from "components/apps/FileExplorer/QuickAccessSidebar";
import StyledFileExplorer from "components/apps/FileExplorer/StyledFileExplorer";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { getIconFromIni } from "components/system/Files/FileEntry/functions";
import FileManager from "components/system/Files/FileManager";
import { useFileSystemActions, useFs, useRootFs } from "contexts/fileSystem";
import { getMountUrl, isMountedFolder } from "contexts/fileSystem/core";
import { useProcess, useProcessesActions } from "contexts/process";
import {
  COMPRESSED_FOLDER_ICON,
  FOLDER_ICON,
  HOME,
  MOUNTED_FOLDER_ICON,
  MY_COMPUTER_ICON,
  PICTURES_FOLDER,
  PREVENT_SCROLL,
  ROOT_NAME,
} from "utils/constants";
import { haltEvent } from "utils/functions";
import { isEditableElement } from "utils/keyboard";

const NAVIGATION_BUTTONS: Record<string, string> = {
  ARROWLEFT: "back",
  ARROWRIGHT: "forward",
};

const FileExplorer: FC<ComponentProcessProps> = ({ id }) => {
  const {
    icon: setProcessIcon,
    title,
    url: setProcessUrl,
  } = useProcessesActions();
  const { closing, componentWindow, icon = "", url = "" } = useProcess(id);
  const fs = useFs();
  const rootFs = useRootFs();
  const { exists, mkdirRecursive, updateFolder } = useFileSystemActions();
  const currentUrl = useRef(url);
  const addressBarRef = useRef<HTMLInputElement | null>(null);
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const directoryName = basename(url);
  const mountUrl = getMountUrl(url, rootFs?.mntMap || {});
  const explorerTitle =
    directoryName === "Public"
      ? "Documentos"
      : getExplorerDirectoryLabel(directoryName) || ROOT_NAME;
  const navigateToQuickAccess = async (path: string): Promise<void> => {
    if (!(await exists(path))) {
      await mkdirRecursive(path);

      if (!(await exists(path))) return;

      await updateFolder(HOME, basename(path));
    }

    setProcessUrl(id, path);
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    const eventKey = event.key.toUpperCase();
    // Text boxes keep these, which move by word on a Mac
    const navigationButton =
      event.altKey &&
      !isEditableElement(event.target) &&
      NAVIGATION_BUTTONS[eventKey];

    if (navigationButton) {
      haltEvent(event);
      componentWindow
        ?.querySelector<HTMLButtonElement>(`nav > button.${navigationButton}`)
        ?.click();
    } else if (event.altKey && eventKey === "ARROWUP") {
      haltEvent(event);
      setProcessUrl(id, dirname(url));
    } else if (event.altKey && eventKey === "D") {
      haltEvent(event);
      addressBarRef.current?.focus(PREVENT_SCROLL);
    } else if (
      eventKey === "F3" ||
      (event.ctrlKey && (eventKey === "E" || eventKey === "F"))
    ) {
      haltEvent(event);
      searchBarRef.current?.focus(PREVENT_SCROLL);
    } else if (
      event.target === componentWindow &&
      // The Menu key on the window already opens the menu of its items
      eventKey !== "CONTEXTMENU" &&
      // Like Explorer, keys on the window go to its items
      componentWindow.querySelector("ol[tabindex]")?.dispatchEvent(
        new KeyboardEvent("keydown", {
          altKey: event.altKey,
          bubbles: true,
          cancelable: true,
          code: event.code,
          ctrlKey: event.ctrlKey,
          key: event.key,
          metaKey: event.metaKey,
          shiftKey: event.shiftKey,
        })
      ) === false
    ) {
      // What the items did with a key, like F5, the page mustn't do too
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (url) {
      title(id, explorerTitle);

      if (
        !icon ||
        url !== currentUrl.current ||
        (mountUrl && icon !== MOUNTED_FOLDER_ICON) ||
        icon === FOLDER_ICON
      ) {
        if (mountUrl && url === mountUrl) {
          setProcessIcon(
            id,
            isMountedFolder(rootFs?.mntMap[url])
              ? MOUNTED_FOLDER_ICON
              : COMPRESSED_FOLDER_ICON
          );
        } else if (fs) {
          setProcessIcon(id, directoryName ? FOLDER_ICON : MY_COMPUTER_ICON);
          getIconFromIni(fs, url).then((iconFile) => {
            if (iconFile) setProcessIcon(id, iconFile);
          });
        }

        currentUrl.current = url;
      }
    }
  }, [
    directoryName,
    explorerTitle,
    fs,
    icon,
    id,
    mountUrl,
    rootFs?.mntMap,
    setProcessIcon,
    title,
    url,
  ]);

  useEffect(() => {
    if (componentWindow && !closing && !url) {
      setProcessUrl(id, "/");
      setProcessIcon(id, MY_COMPUTER_ICON);
    }
  }, [closing, id, componentWindow, setProcessIcon, setProcessUrl, url]);

  useEffect(() => {
    componentWindow?.addEventListener("keydown", onKeyDown, {
      capture: true,
    });

    return () =>
      componentWindow?.removeEventListener("keydown", onKeyDown, {
        capture: true,
      });
  }, [componentWindow, onKeyDown]);

  return url ? (
    <StyledFileExplorer>
      <ExplorerMenuBar id={id} />
      <Navigation
        addressBarRef={addressBarRef}
        hideSearch={Boolean(mountUrl)}
        id={id}
        searchBarRef={searchBarRef}
      />
      <div className="file-explorer-workspace">
        <QuickAccessSidebar
          currentPath={url}
          onNavigate={(path) => {
            void navigateToQuickAccess(path);
          }}
        />
        <div
          className={
            url === PICTURES_FOLDER
              ? "file-explorer-main photos-folder"
              : url === `${HOME}/Desktop`
                ? "file-explorer-main workspace-folder"
                : "file-explorer-main"
          }
        >
          <FileManager id={id} url={url} showStatusBar />
        </div>
      </div>
    </StyledFileExplorer>
  ) : // 
  null;
};

export default FileExplorer;
