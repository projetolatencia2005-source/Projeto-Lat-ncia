import { useMenuActions } from "contexts/menu";
import {
  type ContextMenuCapture,
  type MenuItem,
} from "contexts/menu/useMenuContextState";
import { getProcesses, useProcessesActions } from "contexts/process";
import { useStackOrder } from "contexts/session";
import { useViewport } from "contexts/viewport";
import { MENU_SEPERATOR } from "utils/constants";
import { toggleShowDesktop } from "utils/functions";

const useTaskbarContextMenu = (onStartButton = false): ContextMenuCapture => {
  const { contextMenu } = useMenuActions();
  const { minimize, open } = useProcessesActions();
  const stackOrder = useStackOrder();
  const { fullscreenElement, toggleFullscreen } = useViewport();

  return contextMenu(() => {
    const processArray = Object.entries(getProcesses());
    const allWindowsMinimized =
      processArray.length > 0 &&
      !processArray.some(([, { minimized }]) => !minimized);
    const toggleLabel = allWindowsMinimized
      ? "Show open windows"
      : "Show the desktop";
    const menuItems: MenuItem[] = [
      {
        action: () => toggleShowDesktop(getProcesses(), stackOrder, minimize),
        label: onStartButton ? "Desktop" : toggleLabel,
      },
    ];

    if (onStartButton) {
      menuItems.unshift(
        {
          action: () => open("Terminal"),
          label: "Terminal",
        },
        MENU_SEPERATOR,
        {
          action: () => open("FileExplorer"),
          label: "File Explorer",
        },
        {
          action: () => open("Run"),
          label: "Run",
        },
        MENU_SEPERATOR
      );
    } else {
      menuItems.unshift(
        {
          action: () => toggleFullscreen(),
          label:
            fullscreenElement === document.documentElement
              ? "Exit full screen"
              : "Enter full screen",
        },
        MENU_SEPERATOR
      );
    }

    return menuItems;
  });
};

export default useTaskbarContextMenu;
