import { useEffect, useState } from "react";
import useBrowserTabs from "components/apps/Browser/BrowserTabsContext";
import {
  HOME_PAGE,
  INTERNAL_SITES,
  normalizeInternalUrl,
} from "components/apps/Browser/config";
import { Arrow, Refresh } from "components/apps/Browser/NavigationIcons";
import InternalSites from "components/apps/Browser/sites";
import StyledBrowser from "components/apps/Browser/StyledBrowser";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcess, useProcessesActions } from "contexts/process";
import Button from "styles/common/Button";
import { label } from "utils/functions";

const MENU_ITEMS = [
  ["Arquivos", "files"],
  ["Editar", "edit"],
  ["Favoritos", "favorites"],
  ["Ajuda", "help"],
  ["Histórico", "history"],
] as const;

const Browser: FC<ComponentProcessProps> = ({ id }) => {
  const browserTabs = useBrowserTabs();
  const { icon: setIcon, url: changeUrl } = useProcessesActions();
  const { icon, url: processUrl } = useProcess(id);
  const [openMenu, setOpenMenu] = useState<null | string>(null);
  const [openMenuLeft, setOpenMenuLeft] = useState(6);
  const [refreshKey, setRefreshKey] = useState(0);
  const [addressValue, setAddressValue] = useState<string>(HOME_PAGE);

  // This effect synchronizes the editable address field with browser navigation.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- The field is a local draft that must follow the active tab URL.
    if (browserTabs) setAddressValue(browserTabs.activeTab.url);
  }, [browserTabs]);

  const activeTabUrl = browserTabs?.activeTab.url;
  useEffect(() => {
    if (!activeTabUrl) return;

    if (processUrl !== activeTabUrl) {
      changeUrl(id, activeTabUrl);
    }
    if (icon !== "/System/Doors/figma/icon-internet-expanded.png") {
      setIcon(id, "/System/Doors/figma/icon-internet-expanded.png");
    }
  }, [activeTabUrl, changeUrl, icon, id, processUrl, setIcon]);

  if (!browserTabs) return null;

  const {
    activeTab,
    canGoBack,
    canGoForward,
    closeTab,
    createTab,
    goToHistory,
    moveHistory,
    navigate,
  } = browserTabs;

  const closeMenu = (): void => setOpenMenu(null);
  const onMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    menuId: string
  ): void => {
    if (openMenu === menuId) {
      closeMenu();
      return;
    }

    setOpenMenuLeft(event.currentTarget.offsetLeft + 8);
    setOpenMenu(menuId);
  };
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!event.ctrlKey || event.altKey || event.metaKey) return;

    if (event.key.toLocaleLowerCase() === "t") {
      event.preventDefault();
      createTab();
      closeMenu();
    } else if (event.key.toLocaleLowerCase() === "w") {
      event.preventDefault();
      closeTab(activeTab.id);
    }
  };

  const submitAddress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter") return;

    const internalUrl = normalizeInternalUrl(addressValue);

    navigate(internalUrl);
    setAddressValue(internalUrl);
    closeMenu();
  };

  return (
    <StyledBrowser onKeyDown={onKeyDown}>
      <nav
        aria-label="Menu do navegador"
        className="browser-menu-bar"
      >
        {MENU_ITEMS.map(([title, menuId]) => (
          <Button
            key={menuId}
            aria-expanded={openMenu === menuId}
            aria-haspopup="menu"
            className="menu-item cancel"
            onClick={(event) => onMenuClick(event, menuId)}
            type="button"
          >
            {title}
          </Button>
        ))}
        {openMenu && (
          <div
            aria-label={MENU_ITEMS.find(([, menuId]) => menuId === openMenu)?.[0]}
            className="menu-popover cancel"
            role="menu"
            style={{ left: `${openMenuLeft}px` }}
          >
            {openMenu === "files" && (
              <>
                <button
                  onClick={() => {
                    createTab();
                    closeMenu();
                  }}
                  role="menuitem"
                  type="button"
                >
                  Nova aba <span>Ctrl+T</span>
                </button>
                <button
                  onClick={() => {
                    closeTab(activeTab.id);
                    closeMenu();
                  }}
                  role="menuitem"
                  type="button"
                >
                  Fechar aba <span>Ctrl+W</span>
                </button>
              </>
            )}
            {openMenu === "edit" && (
              <button
                onClick={() => {
                  setRefreshKey((current) => current + 1);
                  closeMenu();
                }}
                role="menuitem"
                type="button"
              >
                Atualizar página
              </button>
            )}
            {openMenu === "favorites" &&
              INTERNAL_SITES.map((site) => (
                <button
                  key={site.id}
                  onClick={() => {
                    navigate(site.url);
                    closeMenu();
                  }}
                  role="menuitem"
                  type="button"
                >
                  {site.title}
                </button>
              ))}
            {openMenu === "help" && (
              <div className="menu-note" role="menuitem">
                Navegador interno · quatro sites locais
              </div>
            )}
            {openMenu === "history" &&
              activeTab.history
                .slice(0, activeTab.position + 1)
                .reverse()
                .map((url, index) => {
                  const position = activeTab.position - index;

                  return (
                    <button
                      key={`${url}-${position}`}
                      onClick={() => {
                        goToHistory(position);
                        closeMenu();
                      }}
                      role="menuitem"
                      type="button"
                    >
                      {new URL(url).hostname}
                      {url !== activeTab.url && (
                        <span>{url.split("/").slice(3).join("/")}</span>
                      )}
                    </button>
                  );
                })}
          </div>
        )}
      </nav>
      <nav
        aria-label="Barra de navegação"
        className="browser-toolbar"
      >
        <div className="navigation-buttons">
          <Button
            className="cancel arrow-button"
            disabled={!canGoBack}
            onClick={() => moveHistory(-1)}
            {...label("Voltar", "Voltar")}
            type="button"
          >
            <Arrow direction="left" />
          </Button>
          <Button
            className="cancel arrow-button"
            disabled={!canGoForward}
            onClick={() => moveHistory(1)}
            {...label("Avançar", "Avançar")}
            type="button"
          >
            <Arrow direction="right" />
          </Button>
          <Button
            className="cancel"
            onClick={() => setRefreshKey((current) => current + 1)}
            {...label("Atualizar página", "Atualizar")}
            type="button"
          >
            <Refresh />
          </Button>
        </div>
        <label className="address-label">
          <span>Endereço</span>
          <input
            aria-label="Endereço e pesquisa"
            className="cancel"
            onChange={({ currentTarget }) => setAddressValue(currentTarget.value)}
            onFocusCapture={(event) => event.currentTarget.select()}
            onKeyDown={submitAddress}
            value={addressValue}
            {...label("Sites internos da Lan House Latência", "Endereço")}
          />
        </label>
      </nav>
      <InternalSites
        key={`${activeTab.id}-${activeTab.url}-${refreshKey}`}
        url={activeTab.url}
      />
    </StyledBrowser>
  );
};

export default Browser;
