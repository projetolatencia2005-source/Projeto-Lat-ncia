import { basename } from "path";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AddressBar from "components/apps/FileExplorer/AddressBar";
import {
  Back,
  ExplorerSearch,
  Forward,
} from "components/apps/FileExplorer/NavigationIcons";
import { QUICK_ACCESS_LOCATIONS } from "components/apps/FileExplorer/QuickAccessSidebar";
import SearchBar from "components/apps/FileExplorer/SearchBar";
import StyledNavigation from "components/apps/FileExplorer/StyledNavigation";
import useTitlebarContextMenu from "components/system/Window/Titlebar/useTitlebarContextMenu";
import { useMenu, useMenuActions } from "contexts/menu";
import { type MenuState } from "contexts/menu/useMenuContextState";
import { useProcess, useProcessesActions } from "contexts/process";
import useHistory from "hooks/useHistory";
import useResizeObserver from "hooks/useResizeObserver";
import Button from "styles/common/Button";
import { FOLDER_ICON, ROOT_NAME } from "utils/constants";
import { haltEvent, label } from "utils/functions";

const StyledNavigationShell = styled.div`
  flex: 0 0 ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};
  height: ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};
  min-width: 0;
  position: relative;
  z-index: 3;

  > nav {
    width: 100%;
  }
`;

const StyledSearchPopover = styled.div`
  background: #dce5f0;
  border: 2px solid #31302c;
  box-shadow: 3px 3px 0 #31302c;
  box-sizing: border-box;
  left: 0;
  padding: 4px;
  position: absolute;
  top: calc(100% + 2px);
  width: 180px;
  z-index: 5;

  .search-entry {
    margin: 0;
    max-width: none;
    width: 100%;
  }
`;

type NavigationProps = {
  addressBarRef: React.RefObject<HTMLInputElement | null>;
  hideSearch: boolean;
  id: string;
  searchBarRef: React.RefObject<HTMLInputElement | null>;
};

const Navigation: FC<NavigationProps> = ({
  addressBarRef,
  hideSearch,
  id,
  searchBarRef,
}) => {
  const { url: changeUrl } = useProcessesActions();
  const { url = "" } = useProcess(id);
  const { contextMenu, setMenu } = useMenuActions();
  const menu = useMenu();
  const { canGoBack, canGoForward, history, moveHistory, position } =
    useHistory(url, id);
  const navRef = useRef<HTMLElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [compactToolbar, setCompactToolbar] = useState(false);
  const [searchLeft, setSearchLeft] = useState(0);
  const [removeSearch, setRemoveSearch] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchVisible = !hideSearch && showSearch && !removeSearch;
  const resizeCallback: ResizeObserverCallback = ([{ contentRect }]) => {
    setCompactToolbar(contentRect.width < 680);
    const tooSmallForSearch = contentRect.width < 260;

    if (removeSearch && !tooSmallForSearch) {
      setRemoveSearch(false);
    } else if (!removeSearch && tooSmallForSearch) {
      setRemoveSearch(true);
    }
  };

  useResizeObserver(navRef, resizeCallback);

  useEffect(() => {
    if (searchVisible) {
      requestAnimationFrame(() => searchBarRef.current?.focus());
    }
  }, [searchBarRef, searchVisible]);

  useEffect(() => {
    if (!searchVisible) return;

    const updateSearchPosition = (): void => {
      const nav = navRef.current;
      const searchButton = searchButtonRef.current;

      if (!nav || !searchButton) return;

      setSearchLeft(
        searchButton.getBoundingClientRect().left -
          nav.getBoundingClientRect().left
      );
    };

    updateSearchPosition();
    const observer = new ResizeObserver(updateSearchPosition);

    if (navRef.current) observer.observe(navRef.current);

    return () => observer.disconnect();
  }, [searchVisible]);

  const foldersMenu = contextMenu(
    () =>
      QUICK_ACCESS_LOCATIONS.map(({ icon, label: locationLabel, path }) => ({
        action: () => changeUrl(id, path),
        icon,
        label: locationLabel,
      })),
    "Pastas",
    true
  );

  const showFolders = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (menu.label === "Pastas") {
      setMenu(Object.create(null) as MenuState);
    } else {
      foldersMenu.onContextMenuCapture(
        undefined,
        event.currentTarget.getBoundingClientRect()
      );
    }
  };

  return (
    <StyledNavigationShell>
      <StyledNavigation
        ref={navRef}
        className={["file-explorer-navigation", compactToolbar && "compact"]
          .filter(Boolean)
          .join(" ")}
        role="presentation"
        {...useTitlebarContextMenu(id)}
        onDragOver={haltEvent}
        onDrop={haltEvent}
      >
        <div className="toolbar-group history-controls">
          <Button
            className="back"
            disabled={!canGoBack}
            onClick={() => moveHistory(-1)}
            {...label(
              canGoBack
                ? `Voltar para ${basename(history[position - 1]) || ROOT_NAME}`
                : "Voltar"
            )}
          >
            <Back />
            <span>Voltar</span>
          </Button>
          <Button
            className="forward"
            disabled={!canGoForward}
            onClick={() => moveHistory(1)}
            {...label(
              canGoForward
                ? `Avançar para ${basename(history[position + 1]) || ROOT_NAME}`
                : "Avançar"
            )}
          >
            <Forward />
            <span>Avançar</span>
          </Button>
        </div>
        <div className="toolbar-group explorer-tools">
          {!hideSearch && (
            <Button
              ref={searchButtonRef}
              aria-expanded={searchVisible}
              className="tool-button"
              onClick={() => setShowSearch((visible) => !visible)}
              {...label("Pesquisar")}
            >
              <ExplorerSearch />
              <span>Pesquisar</span>
            </Button>
          )}
          <Button
            aria-expanded={menu.label === "Pastas"}
            aria-haspopup="menu"
            className="tool-button"
            onClick={showFolders}
            {...label("Pastas")}
          >
            <img
              alt=""
              aria-hidden="true"
              className="explorer-folder-icon"
              draggable={false}
              src={FOLDER_ICON}
            />
            <span>Pastas</span>
          </Button>
        </div>
        <div className="toolbar-group address-group">
          <span className="address-label">Endereço</span>
          <AddressBar ref={addressBarRef} className="address-entry" id={id} />
        </div>
      </StyledNavigation>
      {searchVisible && (
        <StyledSearchPopover style={{ left: searchLeft }}>
          <SearchBar ref={searchBarRef} className="search-entry" id={id} />
        </StyledSearchPopover>
      )}
    </StyledNavigationShell>
  );
};

export default Navigation;
