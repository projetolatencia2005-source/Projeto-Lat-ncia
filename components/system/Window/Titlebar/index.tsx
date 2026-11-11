import { basename } from "path";
import { useRef } from "react";
import useBrowserTabs from "components/apps/Browser/BrowserTabsContext";
import {
  isPostItPath,
  POST_IT_INITIAL_CONTENT,
} from "components/apps/TinyMCE/functions";
import rndDefaults from "components/system/Window/RndWindow/rndDefaults";
import StyledTitlebar from "components/system/Window/Titlebar/StyledTitlebar";
import useTitlebarContextMenu from "components/system/Window/Titlebar/useTitlebarContextMenu";
import useWindowActions from "components/system/Window/Titlebar/useWindowActions";
import {
  MaximizedIcon,
  MaximizeIcon,
  MinimizeIcon,
  TitlebarCloseIcon,
} from "components/system/Window/Titlebar/WindowActionIcons";
import { useFileSystemActions } from "contexts/fileSystem";
import { menuIsOpen, useMenuActions } from "contexts/menu";
import { type MenuState } from "contexts/menu/useMenuContextState";
import { useProcess, useProcessesActions } from "contexts/process";
import { useForegroundId, useSessionActions } from "contexts/session";
import useDoubleClick from "hooks/useDoubleClick";
import Button from "styles/common/Button";
import Icon from "styles/common/Icon";
import {
  FOCUSABLE_ELEMENT,
  FOLDER_ICON,
  LONG_PRESS_DELAY_MS,
  PAPER_ICON,
  PREVENT_SCROLL,
} from "utils/constants";
import { haltEvent, label } from "utils/functions";

type TitlebarProps = {
  id: string;
};

const Titlebar: FC<TitlebarProps> = ({ id }) => {
  const {
    allowResizing = true,
    closing,
    componentWindow,
    hideMaximizeButton,
    hideMinimizeButton,
    hideTitlebarIcon,
    icon,
    maximized,
    title,
    titlebarColor,
    url,
  } = useProcess(id);
  const { setForegroundId } = useSessionActions();
  const foregroundId = useForegroundId();
  const isForeground = id === foregroundId;
  const isFileExplorer = id.startsWith("FileExplorer");
  const isTrashExplorer =
    isFileExplorer && basename(url ?? "").toLocaleLowerCase() === "lixeira";
  const isBrowser = id.startsWith("Browser");
  const isPhotos = id.startsWith("Photos");
  const browserTabs = useBrowserTabs();
  const isPaint = id.startsWith("Paint");
  const isPostIt = isPostItPath(url ?? "");
  const { createPath, updateFolder } = useFileSystemActions();
  const { open } = useProcessesActions();
  const { onClose, onMaximize, onMinimize } = useWindowActions(id);
  const { setMenu } = useMenuActions();
  const resetMenu = (): void => setMenu(Object.create(null) as MenuState);
  const menuIsOpenRef = useRef<boolean>(false);
  const clickCloseCallback = (): void => {
    if (menuIsOpenRef.current) resetMenu();
    onClose();
  };
  const onClickClose = useDoubleClick(clickCloseCallback);
  const onClickMaximize = useDoubleClick(onMaximize);
  const titlebarContextMenu = useTitlebarContextMenu(id);
  const touchStartTimeRef = useRef<number>(0);
  const touchStartPositionRef = useRef<DOMRect>(undefined);
  const touchesRef = useRef<TouchList>(undefined);
  const onTouchEnd: React.TouchEventHandler<HTMLButtonElement> = (event) => {
    const { x, y } = componentWindow?.getBoundingClientRect() || {};

    if (
      Date.now() - touchStartTimeRef.current >= LONG_PRESS_DELAY_MS &&
      touchStartPositionRef.current &&
      touchStartPositionRef.current.x === x &&
      touchStartPositionRef.current.y === y
    ) {
      titlebarContextMenu.onContextMenuCapture(
        Object.assign(event, {
          touches: touchesRef.current,
        })
      );
    }
  };
  const onTouchStart: React.TouchEventHandler<HTMLButtonElement> = ({
    touches,
  }) => {
    if (componentWindow) {
      componentWindow.blur();
      componentWindow.focus(PREVENT_SCROLL);
      touchStartTimeRef.current = Date.now();
      touchStartPositionRef.current = componentWindow.getBoundingClientRect();
      touchesRef.current = touches as unknown as TouchList;
    }
  };
  const onMouseDownCapture: React.MouseEventHandler<HTMLButtonElement> = ({
    button,
  }) => {
    if (button === 0 && menuIsOpen()) resetMenu();
  };
  const onMouseUpCapture: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (componentWindow && componentWindow !== document.activeElement) {
      setForegroundId(id);
      componentWindow?.focus(PREVENT_SCROLL);
    }
  };
  const onIconClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
    if (menuIsOpenRef.current) resetMenu();
    else titlebarContextMenu.onContextMenuCapture(event);

    menuIsOpenRef.current = !menuIsOpenRef.current;

    onClickClose.onClick(event);
  };
  const triggerMinimize = (): void => onMinimize();
  const onBrowserTitlebarDoubleClick: React.MouseEventHandler<HTMLElement> = (
    event
  ) => {
    if ((event.target as HTMLElement).closest(".cancel")) return;

    onMaximize();
  };
  const onIconMouseDownCapture: React.MouseEventHandler<
    HTMLImageElement
  > = () => {
    menuIsOpenRef.current = menuIsOpen();
  };
  const createPostIt = async (): Promise<void> => {
    const directory = "/Users/Public/Documents";
    const fileName = await createPath(
      "Post-it.whtml",
      directory,
      Buffer.from(POST_IT_INITIAL_CONTENT)
    );

    if (!fileName) return;

    await updateFolder(directory, fileName);
    open("TinyMCE", { url: `${directory}/${fileName}` }, PAPER_ICON);
  };

  return (
    <StyledTitlebar
      $browser={isBrowser}
      $fileExplorer={isFileExplorer}
      $foreground={isForeground}
      $paint={isPaint}
      $photos={isPhotos}
      $titlebarColor={titlebarColor}
      className={`${rndDefaults.dragHandleClassName}${
        isPostIt ? " doors-post-it-titlebar" : ""
      }`}
      onDoubleClick={isBrowser ? onBrowserTitlebarDoubleClick : undefined}
      onDragOver={haltEvent}
      onDrop={haltEvent}
      {...titlebarContextMenu}
    >
      {isPostIt && (
        <Button
          aria-label="Criar novo Post-it"
          className="cancel doors-post-it-create"
          onClick={() => void createPostIt()}
          type="button"
        >
          <span aria-hidden="true">+</span>
        </Button>
      )}
      {isBrowser && browserTabs ? (
        <div className="browser-tab-strip">
          <div
            aria-label="Abas do navegador"
            className="browser-tabs"
            role="tablist"
          >
            {browserTabs.tabs.map((tab) => (
              <div
                key={tab.id}
                className={`browser-tab${tab.id === browserTabs.activeTab.id ? " active" : ""}`}
              >
                <Button
                  aria-selected={tab.id === browserTabs.activeTab.id}
                  className="browser-tab-select cancel"
                  onClick={() => browserTabs.selectTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  <span>{tab.title}</span>
                </Button>
                <Button
                  aria-label={
                    browserTabs.tabs.length === 1
                      ? "Fechar navegador"
                      : `Fechar aba ${tab.title}`
                  }
                  className="browser-tab-close cancel"
                  onClick={() => {
                    if (browserTabs.tabs.length === 1) clickCloseCallback();
                    else browserTabs.closeTab(tab.id);
                  }}
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </Button>
              </div>
            ))}
          </div>
          <Button
            aria-label="Nova aba"
            className="browser-tab-add cancel"
            onClick={() => browserTabs.createTab()}
            type="button"
          >
            +
          </Button>
        </div>
      ) : (
        <Button
          aria-label={title}
          {...FOCUSABLE_ELEMENT}
          {...(!hideMaximizeButton && allowResizing && !closing
            ? onClickMaximize
            : {})}
          onMouseDownCapture={onMouseDownCapture}
          onMouseUpCapture={onMouseUpCapture}
          onTouchEndCapture={onTouchEnd}
          onTouchStartCapture={onTouchStart}
        >
          <figure>
            {!isPostIt &&
              !hideTitlebarIcon &&
              (isFileExplorer ? (
                // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- The image is inside the keyboard-operable titlebar control and opens its context menu.
                <img
                  alt=""
                  className="explorer-titlebar-icon"
                  draggable={false}
                  onClick={onIconClick}
                  onMouseDownCapture={onIconMouseDownCapture}
                  src={
                    isTrashExplorer
                      ? "/System/Doors/figma/icon-trash.png"
                      : FOLDER_ICON
                  }
                />
              ) : (
                <Icon
                  alt=""
                  imgSize={isPaint ? 24 : isPhotos ? 20 : 16}
                  onClick={onIconClick}
                  onMouseDownCapture={onIconMouseDownCapture}
                  src={icon}
                />
              ))}
            {!isPostIt && <figcaption>{title}</figcaption>}
          </figure>
        </Button>
      )}
      {/* Shortcuts act on the window in front, so only it advertises them */}
      <nav className="cancel window-actions" role="presentation">
        {!hideMinimizeButton && (
          <Button
            aria-keyshortcuts={
              isForeground && !maximized ? "Control+Shift+ArrowDown" : undefined
            }
            className="minimize"
            onClick={triggerMinimize}
            {...label("Minimize")}
          >
            <MinimizeIcon />
          </Button>
        )}
        {!hideMaximizeButton && (
          <Button
            aria-keyshortcuts={
              isForeground && allowResizing
                ? maximized
                  ? "Control+Shift+ArrowDown"
                  : "Control+Shift+ArrowUp"
                : undefined
            }
            className="maximize"
            disabled={!allowResizing}
            onClick={onMaximize}
            {...(maximized
              ? label("Restore Down", "Restore")
              : label("Maximize"))}
          >
            {maximized ? <MaximizedIcon /> : <MaximizeIcon />}
          </Button>
        )}
        <Button
          $short={hideMaximizeButton && hideMinimizeButton}
          aria-keyshortcuts={isForeground ? "Control+Alt+F4" : undefined}
          className="close"
          onClick={onClose}
          {...label("Close")}
        >
          <TitlebarCloseIcon />
        </Button>
      </nav>
    </StyledTitlebar>
  );
};

export default Titlebar;
