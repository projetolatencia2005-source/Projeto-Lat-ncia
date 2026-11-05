import { dirname, join } from "path";
import { WALLPAPER_MENU } from "components/system/Desktop/Wallpapers/constants";
import { getIconByFileExtension } from "components/system/Files/FileEntry/functions";
import { type FolderActions } from "components/system/Files/FileManager/useFolder";
import {
  type SortBy,
  type SortByOrder,
} from "components/system/Files/FileManager/useSortBy";
import {
  useFileSystemActions,
  usePasteList,
  useRootFs,
} from "contexts/fileSystem";
import { getMountUrl, isMountedFolder } from "contexts/fileSystem/core";
import { useMenuActions } from "contexts/menu";
import {
  type CaptureTriggerEvent,
  type ContextMenuCapture,
} from "contexts/menu/useMenuContextState";
import { getProcess, useProcessesActions } from "contexts/process";
import {
  useCloseEffect,
  useIconPositions,
  useSessionActions,
  useSortOrder,
  useWallpaperImage,
} from "contexts/session";
import { useWebGPUCheck } from "hooks/useWebGPUCheck";
import { CLOSE_EFFECT_NAMES } from "utils/closeEffect";
import {
  DESKTOP_PATH,
  FOLDER_ICON,
  MENU_SEPERATOR,
  MOUNTABLE_EXTENSIONS,
  PROCESS_DELIMITER,
} from "utils/constants";
import {
  blobToBuffer,
  generatePrettyTimestamp,
  getExtension,
  isFileSystemMappingSupported,
  isFirefox,
  isGlobalMusicVisualizationRunning,
  isSafari,
  stopGlobalMusicVisualization,
  updateIconPositions,
} from "utils/functions";

const NEW_FOLDER = "New folder";
const NEW_TEXT_DOCUMENT = "New Text Document.txt";
const NEW_RTF_DOCUMENT = "New Rich Text Document.whtml";

const WALLPAPER_MENU_LABELS: Record<string, string> = {
  "Art Institute of Chicago": "Instituto de Arte de Chicago",
  "Coastal Landscape": "Paisagem costeira",
  "Hexells": "Hexells",
  "Lorem Picsum": "Lorem Picsum",
  "Matrix (2D)": "Matriz (2D)",
  "Matrix (3D)": "Matriz (3D)",
  "Metropolitan Museum of Art": "Museu Metropolitano de Arte",
  "Milky Way": "Via Láctea",
  "NASA APOD": "Imagem astronômica do dia (NASA)",
  "Picture Slideshow": "Apresentação de imagens",
  "Stable Diffusion (beta)": "Stable Diffusion (beta)",
  "Vanta Waves": "Ondas Vanta",
};

const CLOSE_EFFECT_LABELS: Record<string, string> = {
  "Broken Glass": "Vidro quebrado",
  Doom: "Doom",
  "Energize A": "Energizar A",
  "Energize B": "Energizar B",
  Fire: "Fogo",
  Glitch: "Falha visual",
  Hexagon: "Hexágono",
  Incinerate: "Incinerar",
  Matrix: "Matrix",
  None: "Nenhum",
  "Paint Brush": "Pincel",
  Pixelate: "Pixelizar",
  "Pixel Wipe": "Transição pixelada",
  Portal: "Portal",
  Random: "Aleatório",
  "RGB Warp": "Distorção RGB",
  Snap: "Estalo",
  "T-Rex Attack": "Ataque do T-Rex",
  TeamRocket: "Team Rocket",
  "TV Effect": "Efeito de TV",
  Wisps: "Fagulhas",
};


const updateSortBy =
  (value: SortBy, defaultIsAscending: boolean) =>
  ([sortBy, isAscending]: SortByOrder): SortByOrder => [
    value,
    sortBy === value ? !isAscending : defaultIsAscending,
  ];

const CAPTURE_FPS = 30;
const MIME_TYPE_VIDEO_WEBM = "video/webm";
const MIME_TYPE_VIDEO_MP4 = "video/mp4";

let currentMediaStream: MediaStream | undefined;
let currentMediaRecorder: MediaRecorder | undefined;

const captureScreen = async ({
  updateFolder,
  writeFile,
}: Pick<
  ReturnType<typeof useFileSystemActions>,
  "updateFolder" | "writeFile"
>): Promise<void> => {
  if (currentMediaRecorder && currentMediaStream) {
    const { active: wasActive } = currentMediaStream;

    try {
      currentMediaStream.getTracks().forEach((track) => track.stop());
    } catch {
      // Ignore errors with MediaRecorder
    }

    currentMediaRecorder = undefined;
    currentMediaStream = undefined;

    if (wasActive) return;
  }

  const isFirefoxOrSafari = isFirefox() || isSafari();
  const displayMediaOptions: DisplayMediaStreamOptions &
    MediaStreamConstraints = {
    // Safari aborts capture when video constraints are applied
    video: isSafari() ? true : { frameRate: CAPTURE_FPS },
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#browser_compatibility
    ...(!isFirefoxOrSafari && {
      preferCurrentTab: true,
      selfBrowserSurface: "include",
      surfaceSwitching: "include",
      systemAudio: "include",
    }),
  };

  try {
    currentMediaStream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (error) {
    console.error("Failed to start screen capture.", error);
    currentMediaStream = undefined;
    return;
  }

  const [currentVideoTrack] = currentMediaStream.getVideoTracks();
  const { height, width } = currentVideoTrack.getSettings();
  const supportsWebm = MediaRecorder.isTypeSupported(MIME_TYPE_VIDEO_WEBM);
  const fileName = `Screen Capture ${generatePrettyTimestamp()}.${
    supportsWebm ? "webm" : "mp4"
  }`;

  currentMediaRecorder = new MediaRecorder(currentMediaStream, {
    bitsPerSecond: height && width ? height * width * CAPTURE_FPS : undefined,
    mimeType: supportsWebm ? MIME_TYPE_VIDEO_WEBM : MIME_TYPE_VIDEO_MP4,
  });

  const capturePath = join(DESKTOP_PATH, fileName);
  const startTime = Date.now();
  const writeCapture = async (capture: Blob): Promise<void> => {
    await writeFile(capturePath, await blobToBuffer(capture));
    updateFolder(DESKTOP_PATH, fileName);
  };

  currentMediaRecorder.start();
  // Without a timeslice, dataavailable fires once with all data on stop
  currentMediaRecorder.addEventListener("dataavailable", async ({ data }) => {
    if (!data?.size) return;

    if (supportsWebm && !isFirefoxOrSafari) {
      const { default: fixWebmDuration } = await import("fix-webm-duration");

      fixWebmDuration(data, Date.now() - startTime, writeCapture);
    } else {
      await writeCapture(data);
    }
  });
};

const useFolderContextMenu = (
  url: string,
  {
    addToFolder,
    newPath,
    pasteToFolder,
    sortByOrder: [[sortBy, isAscending], setSortBy],
  }: FolderActions,
  isDesktop?: boolean,
  isStartMenu?: boolean
): ContextMenuCapture => {
  const { contextMenu } = useMenuActions();
  const { exists, mapFs, updateFolder, writeFile } = useFileSystemActions();
  const pasteList = usePasteList();
  const rootFs = useRootFs();
  const {
    setCloseEffect,
    setForegroundId,
    setIconPositions,
    setWallpaper: setSessionWallpaper,
  } = useSessionActions();
  const closeEffect = useCloseEffect();
  const iconPositions = useIconPositions();
  const [desktopSortOrder] = useSortOrder(DESKTOP_PATH);
  const wallpaperImage = useWallpaperImage();
  const { minimize, open } = useProcessesActions();
  const updateSorting = (
    value: "" | SortBy,
    defaultIsAscending: boolean
  ): void => {
    setIconPositions((currentIconPositions) =>
      Object.fromEntries(
        Object.entries(currentIconPositions).filter(
          ([entryPath]) => dirname(entryPath) !== url
        )
      )
    );
    setSortBy(
      value === ""
        ? ([currentValue]) => [currentValue, defaultIsAscending]
        : updateSortBy(value, defaultIsAscending)
    );
  };
  const canCapture =
    isDesktop &&
    typeof window !== "undefined" &&
    typeof navigator?.mediaDevices?.getDisplayMedia === "function" &&
    (window?.MediaRecorder?.isTypeSupported(MIME_TYPE_VIDEO_WEBM) ||
      window?.MediaRecorder?.isTypeSupported(MIME_TYPE_VIDEO_MP4));
  const hasWebGPU = useWebGPUCheck();
  const updateDesktopIconPositions = (
    names: string[],
    event?: CaptureTriggerEvent
  ): void => {
    if (event && isDesktop) {
      const { clientX: x, clientY: y } =
        "TouchEvent" in window && event.nativeEvent instanceof TouchEvent
          ? event.nativeEvent.touches[0]
          : (event.nativeEvent as MouseEvent);

      updateIconPositions(
        DESKTOP_PATH,
        event.target as HTMLElement,
        iconPositions,
        desktopSortOrder,
        { x, y },
        names,
        setIconPositions,
        exists
      );
    }
  };
  const newEntry = async (
    entryName: string,
    data?: Buffer,
    event?: CaptureTriggerEvent
  ): Promise<string> =>
    newPath(entryName, data, "rename", (name) =>
      updateDesktopIconPositions([name], event)
    );

  return contextMenu((event) => {
    const { offsetX, offsetY, target } = (event as React.MouseEvent)
      .nativeEvent;
    const targetElement = target as HTMLElement;

    if (!isDesktop && !isStartMenu && offsetX > targetElement.clientWidth) {
      const SCROLL_BUTTON_HEIGHT = 17;
      const SCROLL_ITERATION_HEIGHT = 44;

      return [
        {
          action: () => {
            let top = 0;

            if (offsetY > targetElement.clientHeight - SCROLL_BUTTON_HEIGHT) {
              top = targetElement.scrollHeight;
            } else if (offsetY > SCROLL_BUTTON_HEIGHT) {
              const scrollBarButtonsHeight = SCROLL_BUTTON_HEIGHT * 2;

              top = Math.round(
                (targetElement.scrollHeight *
                  (offsetY - scrollBarButtonsHeight)) /
                  (targetElement.clientHeight - scrollBarButtonsHeight)
              );
            }

            targetElement.scrollTo({
              behavior: "instant",
              top,
            });
          },
          label: "Rolar aqui",
        },
        MENU_SEPERATOR,
        {
          action: () => {
            targetElement.scrollTo({
              behavior: "instant",
              top: 0,
            });
          },
          label: "Início",
        },
        {
          action: () => {
            targetElement.scrollTo({
              behavior: "instant",
              top: targetElement.scrollHeight,
            });
          },
          label: "Fim",
        },
        MENU_SEPERATOR,
        {
          action: () => {
            targetElement.scrollBy({
              behavior: "instant",
              top: -targetElement.clientHeight,
            });
          },
          label: "Página acima",
        },
        {
          action: () => {
            targetElement.scrollBy({
              behavior: "instant",
              top: targetElement.clientHeight,
            });
          },
          label: "Página abaixo",
        },
        MENU_SEPERATOR,
        {
          action: () => {
            targetElement.scrollBy({
              behavior: "instant",
              top: -SCROLL_ITERATION_HEIGHT,
            });
          },
          label: "Rolar para cima",
        },
        {
          action: () => {
            targetElement.scrollBy({
              behavior: "instant",
              top: SCROLL_ITERATION_HEIGHT,
            });
          },
          label: "Rolar para baixo",
        },
      ];
    }

    const ADD_FILE = {
      action: () =>
        addToFolder().then((files) => updateDesktopIconPositions(files, event)),
      label: "Adicionar arquivo(s)",
    };
    const MAP_DIRECTORY = {
      action: () =>
        mapFs(url)
          .then((mappedFolder) => {
            updateDesktopIconPositions([mappedFolder], event);
            updateFolder(url, mappedFolder);
            open("FileExplorer", { url: join(url, mappedFolder) });
          })
          .catch(() => {
            // Ignore failure to map
          }),
      label: "Mapear pasta",
    };
    const FS_COMMANDS = [
      ADD_FILE,
      ...(isFileSystemMappingSupported() ? [MAP_DIRECTORY] : []),
    ];
    const isMusicVisualizationRunning = isGlobalMusicVisualizationRunning();
    const mountUrl = getMountUrl(url, rootFs?.mntMap || {});
    const isReadOnly =
      MOUNTABLE_EXTENSIONS.has(getExtension(url)) ||
      (mountUrl && !isMountedFolder(rootFs?.mntMap[mountUrl]));
    const hasCustomOrder =
      isDesktop &&
      Object.keys(iconPositions).some(
        (entryPath) => dirname(entryPath) === url
      );

    return [
      {
        label: "Ordenar por",
        menu: [
          {
            action: () => updateSorting("name", true),
            label: "Nome",
            toggle: !hasCustomOrder && sortBy === "name",
          },
          {
            action: () => updateSorting("size", false),
            label: "Tamanho",
            toggle: !hasCustomOrder && sortBy === "size",
          },
          {
            action: () => updateSorting("type", true),
            label: "Tipo de item",
            toggle: !hasCustomOrder && sortBy === "type",
          },
          {
            action: () => updateSorting("date", false),
            label: "Data de modificação",
            toggle: !hasCustomOrder && sortBy === "date",
          },
          ...(hasCustomOrder
            ? []
            : [
                MENU_SEPERATOR,
                {
                  action: () => updateSorting("", true),
                  label: "Crescente",
                  toggle: isAscending,
                },
                {
                  action: () => updateSorting("", false),
                  label: "Decrescente",
                  toggle: !isAscending,
                },
              ]),
        ],
      },
      { action: () => updateFolder(url), label: "Atualizar" },
      ...(isDesktop
        ? [
            MENU_SEPERATOR,
            {
              label: "Plano de fundo",
              menu: [
                ...(isMusicVisualizationRunning
                  ? [
                      {
                        action: stopGlobalMusicVisualization,
                        checked: true,
                        label: "Visualização musical",
                      },
                      MENU_SEPERATOR,
                    ]
                  : []),
                ...WALLPAPER_MENU.filter(
                  ({ requiresWebGPU }) => !requiresWebGPU || hasWebGPU
                ).map(({ hasAlt = true, id, name }) => ({
                  action: () => {
                    if (isMusicVisualizationRunning) {
                      stopGlobalMusicVisualization();
                    }
                    setSessionWallpaper(
                      `${id}${
                        hasAlt &&
                        wallpaperImage.startsWith(id) &&
                        !wallpaperImage.endsWith(" ALT")
                          ? " ALT"
                          : ""
                      }`
                    );
                  },
                  label: WALLPAPER_MENU_LABELS[name || id] || name || id,
                  toggle: hasAlt
                    ? wallpaperImage.startsWith(id)
                    : wallpaperImage === id,
                })),
              ],
            },
            {
              label: "Efeito ao fechar a janela",
              menu: CLOSE_EFFECT_NAMES.map((effectName) => ({
                action: () => setCloseEffect(effectName),
                label: CLOSE_EFFECT_LABELS[effectName] || effectName,
                toggle: closeEffect === effectName,
              })),
            },
            ...(canCapture
              ? [
                  {
                    action: () => captureScreen({ updateFolder, writeFile }),
                    label: currentMediaStream?.active
                      ? "Parar captura de tela"
                      : "Capturar tela",
                  },
                ]
              : []),
          ]
        : []),
      ...(isReadOnly
        ? []
        : [
            MENU_SEPERATOR,
            ...FS_COMMANDS,
            {
              action: () => open("Terminal", { url }),
              label: "Abrir Terminal aqui",
            },
            MENU_SEPERATOR,
            {
              action: () => pasteToFolder(event),
              disabled: Object.keys(pasteList).length === 0,
              label: "Colar",
            },
            MENU_SEPERATOR,
            {
              label: "Novo",
              menu: [
                {
                  action: () => newEntry(NEW_FOLDER, undefined, event),
                  icon: FOLDER_ICON,
                  label: "Pasta",
                },
                MENU_SEPERATOR,
                {
                  action: () =>
                    newEntry(NEW_RTF_DOCUMENT, Buffer.from(""), event),
                  icon: getIconByFileExtension(".whtml"),
                  label: "Documento de texto formatado",
                },
                {
                  action: () =>
                    newEntry(NEW_TEXT_DOCUMENT, Buffer.from(""), event),
                  icon: getIconByFileExtension(".txt"),
                  label: "Documento de texto",
                },
              ],
            },
            ...(isDesktop
              ? []
              : [
                  MENU_SEPERATOR,
                  {
                    action: () => {
                      const activePid = `Properties${PROCESS_DELIMITER}${url}`;
                      const activeProcess = getProcess(activePid);

                      if (activeProcess) {
                        if (activeProcess.minimized) minimize(activePid);

                        setForegroundId(activePid);
                      } else {
                        open("Properties", { url });
                      }
                    },
                    label: "Propriedades",
                  },
                ]),
          ]),
    ];
  });
};

export default useFolderContextMenu;
