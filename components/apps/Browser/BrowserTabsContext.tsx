import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import {
  getSiteTitle,
  HOME_PAGE,
  normalizeInternalUrl,
} from "components/apps/Browser/config";

export type BrowserTab = {
  history: string[];
  id: string;
  position: number;
  title: string;
  url: string;
};

type BrowserTabsContextValue = {
  activeTab: BrowserTab;
  canGoBack: boolean;
  canGoForward: boolean;
  closeTab: (id: string) => void;
  createTab: (url?: string) => void;
  goToHistory: (position: number) => void;
  moveHistory: (step: number) => void;
  navigate: (url: string, newTab?: boolean) => void;
  selectTab: (id: string) => void;
  tabs: BrowserTab[];
};

const BrowserTabsContext = createContext<BrowserTabsContextValue | null>(null);

const makeTab = (url: string, id: string): BrowserTab => {
  const normalizedUrl = normalizeInternalUrl(url);

  return {
    history: [normalizedUrl],
    id,
    position: 0,
    title: getSiteTitle(normalizedUrl),
    url: normalizedUrl,
  };
};

export const BrowserTabsProvider: FC<{
  children: React.ReactNode;
  initialUrl?: string;
}> = ({ children, initialUrl = HOME_PAGE }) => {
  const firstId = `browser-tab-${useId()}`;
  const [tabs, setTabs] = useState<BrowserTab[]>(() => [
    makeTab(initialUrl, firstId),
  ]);
  const [activeTabId, setActiveTabId] = useState(firstId);
  const activeTab = tabs.find(({ id }) => id === activeTabId) || tabs[0];

  const navigate = useCallback(
    (value: string, newTab = false): void => {
      const url = normalizeInternalUrl(value);

      if (newTab) {
        const id = `browser-tab-${Math.random().toString(36).slice(2)}`;

        setTabs((currentTabs) => [...currentTabs, makeTab(url, id)]);
        setActiveTabId(id);

        return;
      }

      setTabs((currentTabs) =>
        currentTabs.map((tab) => {
          if (tab.id !== activeTabId || tab.url === url) return tab;

          const history = [...tab.history.slice(0, tab.position + 1), url];

          return {
            history,
            id: tab.id,
            position: history.length - 1,
            title: getSiteTitle(url),
            url,
          };
        })
      );
    },
    [activeTabId]
  );

  const createTab = useCallback(
    (url: string = HOME_PAGE): void => {
      const id = `browser-tab-${Math.random().toString(36).slice(2)}`;

      setTabs((currentTabs) => [...currentTabs, makeTab(url, id)]);
      setActiveTabId(id);
    },
    []
  );

  const closeTab = useCallback(
    (id: string): void => {
      if (tabs.length === 1) {
        setTabs([makeTab(HOME_PAGE, firstId)]);
        setActiveTabId(firstId);

        return;
      }

      const closingIndex = tabs.findIndex((tab) => tab.id === id);
      const remaining = tabs.filter((tab) => tab.id !== id);

      setTabs(remaining);

      if (id === activeTabId) {
        const nextIndex = Math.min(Math.max(closingIndex - 1, 0), remaining.length - 1);

        setActiveTabId(remaining[nextIndex].id);
      }
    },
    [activeTabId, firstId, tabs]
  );

  const selectTab = useCallback((id: string): void => setActiveTabId(id), []);

  const moveHistory = useCallback(
    (step: number): void => {
      setTabs((currentTabs) =>
        currentTabs.map((tab) => {
          if (tab.id !== activeTabId) return tab;

          const position = Math.max(
            0,
            Math.min(tab.history.length - 1, tab.position + step)
          );
          const url = tab.history[position];

          return { ...tab, position, title: getSiteTitle(url), url };
        })
      );
    },
    [activeTabId]
  );

  const goToHistory = useCallback(
    (position: number): void => {
      setTabs((currentTabs) =>
        currentTabs.map((tab) => {
          if (tab.id !== activeTabId) return tab;

          const boundedPosition = Math.max(
            0,
            Math.min(tab.history.length - 1, position)
          );
          const url = tab.history[boundedPosition];

          return {
            ...tab,
            position: boundedPosition,
            title: getSiteTitle(url),
            url,
          };
        })
      );
    },
    [activeTabId]
  );

  const value = useMemo<BrowserTabsContextValue>(
    () => ({
      activeTab,
      canGoBack: activeTab.position > 0,
      canGoForward: activeTab.position < activeTab.history.length - 1,
      closeTab,
      createTab,
      goToHistory,
      moveHistory,
      navigate,
      selectTab,
      tabs,
    }),
    [
      activeTab,
      closeTab,
      createTab,
      goToHistory,
      moveHistory,
      navigate,
      selectTab,
      tabs,
    ]
  );

  return (
    <BrowserTabsContext.Provider value={value}>
      {children}
    </BrowserTabsContext.Provider>
  );
};

const useBrowserTabs = (): BrowserTabsContextValue | null =>
  useContext(BrowserTabsContext);

export default useBrowserTabs;
