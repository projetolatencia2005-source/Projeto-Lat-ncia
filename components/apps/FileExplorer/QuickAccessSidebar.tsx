import { basename } from "path";
import Button from "styles/common/Button";
import {
  DOWNLOADS_FOLDER,
  HOME,
  MY_COMPUTER_ICON,
} from "utils/constants";

export const QUICK_ACCESS_LOCATIONS = [
  {
    icon: MY_COMPUTER_ICON,
    label: "Área de Trabalho",
    path: `${HOME}/Desktop`,
  },
  {
    icon: "/System/Doors/Explorer/fotos.svg",
    label: "Fotos",
    path: `${HOME}/Pictures`,
  },
  {
    icon: "/System/Doors/Explorer/documentos.svg",
    label: "Documentos",
    path: `${HOME}/Documents`,
  },
  {
    icon: "/System/Doors/Explorer/video.svg",
    label: "Vídeos",
    path: `${HOME}/Videos`,
  },
  {
    icon: "/System/Doors/Explorer/musica.svg",
    label: "Músicas",
    path: `${HOME}/Music`,
  },
  {
    icon: "/System/Doors/Explorer/downloads.svg",
    label: "Downloads",
    path: DOWNLOADS_FOLDER,
  },
] as const;

export const getExplorerDirectoryLabel = (directoryName: string): string => {
  if (directoryName.toLocaleLowerCase() === "desktop") {
    return "Área de Trabalho";
  }

  return (
    QUICK_ACCESS_LOCATIONS.find(
      ({ path }) => basename(path) === directoryName
    )?.label || directoryName
  );
};

type QuickAccessSidebarProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

const QuickAccessSidebar: FC<QuickAccessSidebarProps> = ({
  currentPath,
  onNavigate,
}) => (
  <nav aria-label="Pastas rápidas" className="quick-access-sidebar">
    {QUICK_ACCESS_LOCATIONS.map(({ icon, label, path }) => (
      <Button
        key={path}
        aria-current={currentPath === path ? "page" : undefined}
        className={
          path === `${HOME}/Desktop`
            ? "quick-access-entry workspace-entry"
            : "quick-access-entry"
        }
        onClick={() => onNavigate(path)}
        title={label}
        type="button"
      >
        <img alt="" aria-hidden="true" draggable={false} src={icon} />
        <span>{label}</span>
      </Button>
    ))}
  </nav>
);

export default QuickAccessSidebar;
