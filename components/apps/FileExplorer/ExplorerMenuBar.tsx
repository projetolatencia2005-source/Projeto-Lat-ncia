import { dirname } from "path";
import StyledExplorerMenuBar from "components/apps/FileExplorer/StyledExplorerMenuBar";
import { useMenu, useMenuActions } from "contexts/menu";
import {
  type MenuItem,
  type MenuState,
} from "contexts/menu/useMenuContextState";
import { useProcess, useProcessesActions } from "contexts/process";
import { FOLDER_ICON, MY_COMPUTER_ICON } from "utils/constants";
import { label } from "utils/functions";

type ExplorerMenuBarProps = {
  id: string;
};

type ShortcutModifiers = {
  ctrlKey?: boolean;
  shiftKey?: boolean;
};

const FAVORITE_LOCATIONS = [
  ["Área de trabalho", "/Users/Public/Desktop"],
  ["Documentos", "/Users/Public/Documents"],
  ["Imagens", "/Users/Public/Pictures"],
  ["Músicas", "/Users/Public/Music"],
  ["Vídeos", "/Users/Public/Videos"],
  ["Meu Computador", "/"],
] as const;

const ExplorerMenuBar: FC<ExplorerMenuBarProps> = ({ id }) => {
  const { componentWindow, url = "/" } = useProcess(id);
  const { closeWithTransition, open, url: changeUrl } = useProcessesActions();
  const { contextMenu, setMenu } = useMenuActions();
  const menu = useMenu();

  const dispatchShortcut = (
    key: string,
    { ctrlKey = false, shiftKey = false }: ShortcutModifiers = {}
  ): void => {
    const fileList = componentWindow?.querySelector<HTMLElement>("ol[tabindex]");

    fileList?.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        code:
          key.length === 1
            ? `Key${key.toUpperCase()}`
            : key === "Delete"
              ? "Delete"
              : key,
        ctrlKey,
        key,
        shiftKey,
      })
    );
  };

  const chooseView = (view: "Details view" | "Medium icons view"): void => {
    componentWindow
      ?.querySelector<HTMLButtonElement>(`button[aria-label="${view}"]`)
      ?.click();
  };

  const menus: Record<string, MenuItem[]> = {
    Arquivos: [
      {
        action: () => open("FileExplorer", { url }),
        label: "Nova janela",
      },
      {
        action: () => changeUrl(id, dirname(url)),
        disabled: url === "/",
        label: "Subir um nível",
      },
      { seperator: true },
      {
        action: () => closeWithTransition(id),
        label: "Fechar janela",
      },
    ],
    Editar: [
      {
        action: () => dispatchShortcut("a", { ctrlKey: true }),
        label: "Selecionar tudo",
      },
      { seperator: true },
      {
        action: () => dispatchShortcut("x", { ctrlKey: true }),
        label: "Recortar",
      },
      {
        action: () => dispatchShortcut("c", { ctrlKey: true }),
        label: "Copiar",
      },
      {
        action: () => dispatchShortcut("v", { ctrlKey: true }),
        label: "Colar",
      },
      {
        action: () => dispatchShortcut("Delete"),
        label: "Excluir",
      },
      {
        action: () => dispatchShortcut("F2"),
        label: "Renomear",
      },
    ],
    Visualizar: [
      {
        action: () => chooseView("Medium icons view"),
        label: "Ícones médios",
      },
      {
        action: () => chooseView("Details view"),
        label: "Detalhes",
      },
    ],
    Favoritos: FAVORITE_LOCATIONS.map(([name, path]) => ({
      action: () => changeUrl(id, path),
      icon: path === "/" ? MY_COMPUTER_ICON : FOLDER_ICON,
      label: name,
    })),
    Ferramentas: [
      {
        action: () => open("Terminal", { url }),
        label: "Abrir Terminal aqui",
      },
    ],
    Ajuda: [
      {
        label: "Atalhos do Explorador",
        menu: [
          { disabled: true, label: "Ctrl+A — Selecionar tudo" },
          { disabled: true, label: "Ctrl+C / Ctrl+X — Copiar / recortar" },
          { disabled: true, label: "Ctrl+V — Colar" },
          { disabled: true, label: "F2 — Renomear" },
        ],
      },
    ],
  };

  const showMenu = (
    name: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    if (menu.label === name) {
      setMenu(Object.create(null) as MenuState);
      return;
    }

    contextMenu(() => menus[name], name, true).onContextMenuCapture(
      undefined,
      event.currentTarget.getBoundingClientRect()
    );
  };

  return (
    <StyledExplorerMenuBar aria-label="Menus do Explorador">
      {Object.keys(menus).map((name) => (
        <button
          key={name}
          aria-expanded={menu.label === name}
          aria-haspopup="menu"
          onClick={(event) => showMenu(name, event)}
          type="button"
          {...label(name)}
        >
          {name}
        </button>
      ))}
      <span
        aria-hidden="true"
        className="start-menu"
      >
        <span aria-hidden="true" className="figma-door-mark">
          <img
            alt=""
            draggable={false}
            src="/System/Doors/figma/door-wordmark.png"
          />
        </span>
      </span>
    </StyledExplorerMenuBar>
  );
};

export default ExplorerMenuBar;
