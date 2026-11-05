import { basename } from "path";
import { useEffect, useRef, useState } from "react";
import {
  GoTo,
  PixelArrow,
} from "components/apps/FileExplorer/NavigationIcons";
import { getExplorerDirectoryLabel } from "components/apps/FileExplorer/QuickAccessSidebar";
import StyledAddressBar from "components/apps/FileExplorer/StyledAddressBar";
import useAddressBarContextMenu from "components/apps/FileExplorer/useAddressBarContextMenu";
import { getProcessByFileExtension } from "components/system/Files/FileEntry/functions";
import { useFileSystemActions } from "contexts/fileSystem";
import { useMenu, useMenuActions } from "contexts/menu";
import { type MenuState } from "contexts/menu/useMenuContextState";
import { useProcess, useProcessesActions } from "contexts/process";
import { useSessionActions } from "contexts/session";
import Button from "styles/common/Button";
import {
  DISBALE_AUTO_INPUT_FEATURES,
  FOLDER_ICON,
  MY_COMPUTER_ICON,
  PREVENT_SCROLL,
  ROOT_NAME,
  TRANSITIONS_IN_MILLISECONDS,
} from "utils/constants";
import { getExtension, label, notFound } from "utils/functions";
import { isComposingKey } from "utils/keyboard";

type AddressBarProps = {
  className?: string;
  id: string;
};

export const ADDRESS_INPUT_PROPS = {
  enterKeyHint: "go",
  inputMode: "url",
  name: "address",
  ...DISBALE_AUTO_INPUT_FEATURES,
} as React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const AddressBar: FCWithRef<HTMLInputElement, AddressBarProps> = ({
  className,
  id,
  ref: addressBarRef,
}) => {
  const actionButtonRef = useRef<HTMLButtonElement | null>(null);
  const { open, url: changeUrl } = useProcessesActions();
  const { componentWindow, url = "" } = useProcess(id);
  const { contextMenu, setMenu } = useMenuActions();
  const menu = useMenu();
  const currentDirectoryName = basename(url) || ROOT_NAME;
  const displayName = getExplorerDirectoryLabel(currentDirectoryName);
  const [addressBar, setAddressBar] = useState(displayName);
  const { exists, stat, updateFolder } = useFileSystemActions();
  const { updateRecentFiles } = useSessionActions();
  // Stays set while focus moves to the action button so its click can submit
  const [focused, setFocused] = useState(false);
  // Only focusing selects the path, so typing it out isn't selected
  const selectOnFocusRef = useRef(false);
  const inputing = focused && addressBar !== displayName && addressBar !== url;
  const addressPlacesMenu = contextMenu(
    () => [
      ...[
        ["Área de trabalho", "/Users/Public/Desktop"],
        ["Documentos", "/Users/Public/Documents"],
        ["Imagens", "/Users/Public/Pictures"],
        ["Músicas", "/Users/Public/Music"],
        ["Vídeos", "/Users/Public/Videos"],
        ["Downloads", "/Users/Public/Downloads"],
        ["Meu Computador", "/"],
      ].map(([name, path]) => ({
        action: () => changeUrl(id, path),
        icon: path === "/" ? MY_COMPUTER_ICON : FOLDER_ICON,
        label: name,
      })),
      { seperator: true },
      {
        action: () => updateFolder(url),
        label: `Atualizar "${displayName}"`,
      },
    ],
    "Endereço",
    true
  );
  const goToAddress = async (): Promise<void> => {
    if (addressBar && (await exists(addressBar))) {
      if ((await stat(addressBar)).isDirectory()) changeUrl(id, addressBar);
      else {
        const openPid = getProcessByFileExtension(getExtension(addressBar));

        open(openPid || "OpenWith", { url: addressBar });

        if (openPid) {
          updateRecentFiles(addressBar, openPid);
        }
      }
    } else {
      notFound(addressBar);
    }

    // Like Windows, focus moves from the address to the items
    if (document.activeElement === addressBarRef?.current) {
      componentWindow
        ?.querySelector<HTMLElement>("ol[tabindex]")
        ?.focus(PREVENT_SCROLL);
    }
  };

  useEffect(() => {
    if (addressBarRef?.current) {
      if (addressBar === url) {
        if (selectOnFocusRef.current) addressBarRef.current.select();
        selectOnFocusRef.current = false;
      } else if (addressBar === displayName) {
        window.getSelection()?.removeAllRanges();
      } else if (document.activeElement !== addressBarRef.current) {
        setAddressBar(displayName);
      }
    }
  }, [addressBar, addressBarRef, displayName, url]);

  return (
    <StyledAddressBar className={className}>
      <input
        ref={addressBarRef}
        aria-label="Address"
        className={inputing ? "inputing" : ""}
        onBlurCapture={({ relatedTarget }) => {
          if (actionButtonRef.current !== relatedTarget) {
            setFocused(false);
            setAddressBar(displayName);
          }
        }}
        onChange={({ target }) => setAddressBar(target.value)}
        onFocusCapture={() => {
          selectOnFocusRef.current = true;
          setFocused(true);
          setAddressBar(url);
        }}
        onKeyDown={(event) => {
          if (isComposingKey(event.nativeEvent)) return;
          if (event.key === "Enter") goToAddress();
          else if (event.key === "Escape" && inputing) {
            // Like Windows, what was typed is undone
            event.preventDefault();
            setAddressBar(url);
          }
        }}
        value={addressBar}
        {...ADDRESS_INPUT_PROPS}
        {...useAddressBarContextMenu(url)}
      />
      <Button
        ref={actionButtonRef}
        aria-expanded={menu.label === "Endereço"}
        aria-haspopup="menu"
        className="action"
        onClick={(event) => {
          if (inputing) {
            goToAddress();
            return;
          }

          if (menu.label === "Endereço") {
            setMenu(Object.create(null) as MenuState);
          } else {
            addressPlacesMenu.onContextMenuCapture(
              undefined,
              event.currentTarget.getBoundingClientRect()
            );
          }
        }}
        onFocusCapture={() =>
          setTimeout(() => {
            setFocused(document.activeElement === addressBarRef?.current);
            setAddressBar(displayName);
          }, TRANSITIONS_IN_MILLISECONDS.DOUBLE_CLICK / 2)
        }
        {...label(
          inputing ? `Go to "${addressBar}"` : "Open address locations"
        )}
      >
        {inputing ? <GoTo /> : <PixelArrow direction="down" size={30} />}
      </Button>
    </StyledAddressBar>
  );
};

export default AddressBar;
