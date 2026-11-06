
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";
import DirectionArrow from "components/system/DirectionArrow";
import FileManager from "components/system/Files/FileManager";
import ShutdownDialog from "components/system/StartMenu/ShutdownDialog";
import StyledStartMenu from "components/system/StartMenu/StyledStartMenu";
import {
  maybeCloseTaskbarMenu,
  START_BUTTON_TITLE,
} from "components/system/Taskbar/functions";
import { updateInputValueOnReactElement } from "components/system/Taskbar/Search/functions";
import useTaskbarItemTransition from "components/system/Taskbar/useTaskbarItemTransition";
import { useRootFs } from "contexts/fileSystem";
import { resetStorageAndReload } from "contexts/fileSystem/useAsyncFs";
import { useProcessesActions } from "contexts/process";
import { useSessionActions } from "contexts/session";
import {
  FOCUSABLE_ELEMENT,
  FOLDER_ICON,
  HOME,
  PREVENT_SCROLL,
  START_MENU_PATH,
} from "utils/constants";
import { haltEvent } from "utils/functions";
import {
  focusByCharacter,
  focusByKey,
  isKeyboardNavigating,
  isPrintableKey,
  isVisibleElement,
  restoreFocus,
} from "utils/keyboard";

type StartMenuProps = {
  toggleSearch: (showSearch?: boolean) => void;
  toggleStartMenu: (showMenu?: boolean) => void;
};

const getEntries = (list?: Element | null): HTMLButtonElement[] =>
  [...(list?.querySelectorAll<HTMLButtonElement>("li > button") || [])].filter(
    isVisibleElement
  );

const StartMenu: FC<StartMenuProps> = ({ toggleSearch, toggleStartMenu }) => {
  const menuRef = useRef<HTMLElement | null>(null);
  const returnFocusRef = useRef<Element | null>(null);
  const shutdownCancelRef = useRef<HTMLButtonElement | null>(null);
  const closingRef = useRef(false);
  const rootFs = useRootFs();
  const { open } = useProcessesActions();
  const { setHaltSession } = useSessionActions();
  const {
    sizes: { startMenu },
  } = useTheme();
  const [showPrograms, setShowPrograms] = useState(false);
  const [showShutdownPrompt, setShowShutdownPrompt] = useState(false);
  const [showScrolling, setShowScrolling] = useState(false);
  const canCustomizeScrollbarWidth = useMemo(
    () => CSS.supports("selector(::-webkit-scrollbar)"),
    []
  );
  const focusOnRenderCallback = (element: HTMLElement | null): void => {
    if (element && !element.contains(document.activeElement)) {
      returnFocusRef.current = document.activeElement;
    }

    element?.focus(PREVENT_SCROLL);
    menuRef.current = element;
  };
  const openSearch = (key: string): void => {
    toggleStartMenu(false);
    toggleSearch(true);

    let tries = 0;
    const openSearchTimerRef = window.setInterval(() => {
      const searchInput = document.querySelector<HTMLInputElement>(
        "#searchMenu .search > input"
      );

      if (searchInput) updateInputValueOnReactElement(searchInput, key);

      if (searchInput || (tries += 1) > 10) {
        window.clearInterval(openSearchTimerRef);
      }
    }, 50);
  };
  const openFavorite = (
    processId: string,
    processArguments?: Parameters<typeof open>[1],
    icon?: string
  ): void => {
    toggleStartMenu(false);
    open(processId, processArguments, icon);
  };
  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    const { key, target } = event;
    const menuElement = menuRef.current;
    const appList = menuElement?.querySelector(".doors-start-menu-programs");
    const list =
      target === menuElement
        ? appList
        : (target as Element).closest(
            "#startMenu nav.doors-start-menu-favorites, #startMenu .doors-start-menu-programs"
          );
    const isPrintable = isPrintableKey(event);

    if (key === "Escape") {
      event.preventDefault();
      closingRef.current = true;
      toggleStartMenu(false);
      restoreFocus(returnFocusRef.current, menuElement);
      closingRef.current = false;
    } else if (
      list &&
      (focusByKey(key, getEntries(list), { horizontal: false }) ||
        (appList?.contains(target as Node) &&
          isPrintable &&
          isKeyboardNavigating() &&
          focusByCharacter(key, getEntries(appList))))
    ) {
      haltEvent(event);
    } else if (isPrintable) openSearch(key);
  };
  const startMenuTransition = useTaskbarItemTransition(startMenu.maxHeight);
  const revealScrolling: React.MouseEventHandler = ({ clientX = 0 }) =>
    setShowScrolling(clientX > startMenu.size - 18);

  return (
    <>
      <StyledStartMenu
        ref={focusOnRenderCallback}
        $showScrolling={showScrolling && canCustomizeScrollbarWidth}
        aria-keyshortcuts="Escape"
        aria-label="Menu Iniciar"
        id="startMenu"
        onBlurCapture={(event) => {
          if (!closingRef.current && !showShutdownPrompt) {
            maybeCloseTaskbarMenu(
              event,
              menuRef.current,
              toggleStartMenu,
              undefined,
              START_BUTTON_TITLE
            );
          }
        }}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setShowScrolling(false)}
        onMouseMove={revealScrolling}
        role="dialog"
        {...startMenuTransition}
        {...FOCUSABLE_ELEMENT}
      >
        <header className="doors-start-menu-header">
          <img
            alt=""
            aria-hidden="true"
            className="doors-start-menu-avatar"
            src="/System/Doors/figma/login-avatar-tree.png"
          />
          <strong>Administrador</strong>
        </header>

        <div className="doors-start-menu-main">
          <nav
            aria-label="Acessos favoritos"
            className="doors-start-menu-favorites"
          >
            <ol>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "FileExplorer",
                      { url: `${HOME}/Documents` },
                      FOLDER_ICON
                    )
                  }
                  type="button"
                >
                  <img alt="" src="/System/Doors/figma/pasta.svg" />
                  <span>Pastas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "Browser",
                      undefined,
                      "/System/Doors/figma/internet.svg"
                    )
                  }
                  type="button"
                >
                  <img
                    alt=""
                    src="/System/Doors/figma/internet.svg"
                  />
                  <span>Internet Expandida</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "Paint",
                      undefined,
                      "/System/Doors/figma/paintnovo.svg"
                    )
                  }
                  type="button"
                >
                  <img alt="" src="/System/Doors/figma/paintnovo.svg" />
                  <span>Rabisco</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "TinyMCE",
                      { url: `${HOME}/Post-it.whtml` },
                      "/System/Doors/postit.svg"
                    )
                  }
                  type="button"
                >
                  <img alt="" src="/System/Doors/postit.svg" />
                  <span>Post-It</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "Textos",
                      undefined,
                      "/System/Doors/textos/textos.svg"
                    )
                  }
                  type="button"
                >
                  <img alt="" src="/System/Doors/textos/textos.svg" />
                  <span>Textos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openFavorite(
                      "Chess",
                      undefined,
                      "/System/Doors/figma/xadrez-prancheta.svg"
                    )
                  }
                  type="button"
                >
                  <img alt="" src="/System/Doors/figma/xadrez-prancheta.svg" />
                  <span>Xadrez</span>
                </button>
              </li>
            </ol>
          </nav>

          <section
            aria-label={
              showPrograms ? "Todos os programas" : "Área de programas"
            }
            className="doors-start-menu-programs-pane"
          >
            {showPrograms && (
              <FileManager
                url={START_MENU_PATH}
                hideLoading
                hideShortcutIcons
                isStartMenu
                loadIconsImmediately
                readOnly
                skipFsWatcher
                skipSorting
              />
            )}
          </section>
        </div>

        <footer className="doors-start-menu-footer">
          <button
            aria-expanded={showPrograms}
            className="doors-start-menu-all-programs"
            onClick={() => setShowPrograms((current) => !current)}
            type="button"
          >
            <span>Todos Programas</span>
            <DirectionArrow
              className="doors-start-menu-chevron"
              direction={showPrograms ? "left" : "right"}
              size={25}
            />
          </button>
          <button
            aria-label="Desligar o computador"
            className="doors-start-menu-power"
            onClick={() => setShowShutdownPrompt(true)}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              src="/System/Doors/figma/desligar.svg"
            />
          </button>
        </footer>
      </StyledStartMenu>

      {showShutdownPrompt &&
        typeof document !== "undefined" &&
        createPortal(
          <ShutdownDialog
            cancelRef={shutdownCancelRef}
            onCancel={() => setShowShutdownPrompt(false)}
            onConfirm={() => {
              setHaltSession(true);
              resetStorageAndReload(rootFs);
            }}
          />,
          document.body
        )}
    </>
  );
};

export default StartMenu;
