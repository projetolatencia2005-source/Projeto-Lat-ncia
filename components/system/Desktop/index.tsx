import { useCallback, useEffect, useRef, useState } from "react";
import StyledDesktop from "components/system/Desktop/StyledDesktop";
import useWallpaper from "components/system/Desktop/Wallpapers/useWallpaper";
import FileManager from "components/system/Files/FileManager";
import LockedFolderProvider from "components/system/Files/LockedFolder";
import { useFileSystemActions, useRootFs } from "contexts/fileSystem";
import { resetStorage } from "contexts/fileSystem/functions";
import {
  applyAccessibilityPreferences,
  readAccessibilityPreferences,
} from "utils/accessibility";
import { DESKTOP_PATH, TASKBAR_HEIGHT } from "utils/constants";

const SESSION_DURATION_SECONDS = 5 * 60;
const BOOT_LOADING_DURATION_MS = 4000;
const BOOT_LOADING_FRAME_SEQUENCE = [
  "/System/Doors/loading/01.svg",
  "/System/Doors/loading/02.svg",
  "/System/Doors/loading/03.svg",
  "/System/Doors/loading/04.svg",
  "/System/Doors/loading/05.svg",
  "/System/Doors/loading/06.svg",
  "/System/Doors/loading/07.svg",
  "/System/Doors/loading/08.svg",
  "/System/Doors/loading/09.svg",
  "/System/Doors/loading/10.svg",
  "/System/Doors/loading/11.svg",
  "/System/Doors/loading/12.svg",
] as const;
const BOOT_LOADING_FRAMES = Array.from({ length: 3 }, () => [
  ...BOOT_LOADING_FRAME_SEQUENCE,
]).flat();

type SessionStatusProps = { bonusSeconds: number; startedAt: number };

type StatusPosition = { x: number; y: number };

const STATUS_POSITION_KEY = "doors-session-status-position-v2";
const RESET_ON_NEXT_LOAD_KEY = "doors-reset-on-next-load-v1";
const REQUESTED_FILES_CLEANUP_KEY = "doors-requested-files-cleanup-v3";
const REQUESTED_FILES_TO_REMOVE = [
  ["/Users/Public/Desktop/image.png", "/Users/Public/Desktop"],
  ["/Users/Public/Documents/Post-it.whtml", "/Users/Public/Documents"],
  [
    "/Users/Public/Documents/Post-it (1).whtml",
    "/Users/Public/Documents",
  ],
  ["/Users/Public/Documents/Abrir porta.url", "/Users/Public/Documents"],
  ["/Users/Public/Documents/Modelo currículo.whtml", "/Users/Public/Documents"],
  [
    "/Users/Public/Documents/Modelo currículo (1).whtml",
    "/Users/Public/Documents",
  ],
  ["/Users/Public/Pasta trancada/Chave - Alfabetização.txt", "/Users/Public/Pasta trancada"],
  ["/Users/Public/Pasta trancada/Chave - Informação.txt", "/Users/Public/Pasta trancada"],
  ["/Users/Public/Pasta trancada/Chave - Ta chave essa.txt", "/Users/Public/Pasta trancada"],
] as const;

type BootStage = "loading" | "login" | "splash" | "tutorial";
type BootDestination = Exclude<BootStage, "loading">;

const WindowControls: FC = () => (
  <span aria-hidden="true" className="doors-boot-controls">
    <img alt="" src="/System/Doors/figma/window-control-minimize.svg" />
    <img alt="" src="/System/Doors/figma/window-control-maximize.svg" />
    <img alt="" src="/System/Doors/figma/window-control-close.svg" />
  </span>
);

const SessionStatus: FC<SessionStatusProps> = ({ bonusSeconds, startedAt }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(SESSION_DURATION_SECONDS);
  const [position, setPosition] = useState<null | StatusPosition>(null);
  const statusRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STATUS_POSITION_KEY);
      const parsed = saved ? (JSON.parse(saved) as StatusPosition) : null;

      if (
        parsed &&
        Number.isFinite(parsed.x) &&
        Number.isFinite(parsed.y)
      ) {
        const bounds = statusRef.current?.getBoundingClientRect();
        const maxX = Math.max(0, window.innerWidth - (bounds?.width ?? 0));
        const maxY = Math.max(
          0,
          window.innerHeight - TASKBAR_HEIGHT - (bounds?.height ?? 0)
        );

        setPosition({
          x: Math.max(0, Math.min(maxX, parsed.x)),
          y: Math.max(0, Math.min(maxY, parsed.y)),
        });
      }
    } catch {
      // Fall back to the default corner if saved position data is invalid.
    }
  }, []);

  useEffect(() => {
    const keepPositionVisible = (): void => {
      const bounds = statusRef.current?.getBoundingClientRect();

      if (!bounds) return;

      const maxX = Math.max(0, window.innerWidth - bounds.width);
      const maxY = Math.max(
        0,
        window.innerHeight - TASKBAR_HEIGHT - bounds.height
      );

      setPosition((current) =>
        current
          ? {
              x: Math.max(0, Math.min(maxX, current.x)),
              y: Math.max(0, Math.min(maxY, current.y)),
            }
          : current
      );
    };

    window.addEventListener("resize", keepPositionVisible);
    return () => window.removeEventListener("resize", keepPositionVisible);
  }, []);

  useEffect(() => {
    const updateTime = (): void => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setRemainingSeconds(Math.max(0, SESSION_DURATION_SECONDS + bonusSeconds - elapsed));
    };
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, [bonusSeconds, startedAt]);

  const time = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
  const savePosition = (nextPosition: StatusPosition): void => {
    setPosition(nextPosition);

    try {
      window.localStorage.setItem(
        STATUS_POSITION_KEY,
        JSON.stringify(nextPosition)
      );
    } catch {
      // The counter remains movable for this session if storage is unavailable.
    }
  };
  const startDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    if (event.button !== 0 || !statusRef.current) return;

    const { left, top } = statusRef.current.getBoundingClientRect();
    dragRef.current = {
      originX: left,
      originY: top,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };
  const moveDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId || !statusRef.current) return;

    const { height, width } = statusRef.current.getBoundingClientRect();
    savePosition({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - width,
          drag.originX + event.clientX - drag.startX
        )
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - TASKBAR_HEIGHT - height,
          drag.originY + event.clientY - drag.startY
        )
      ),
    });
  };
  const endDrag: React.PointerEventHandler<HTMLElement> = () => {
    dragRef.current = null;
  };
  const moveByKeyboard: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    const offsets: Record<string, StatusPosition> = {
      ArrowDown: { x: 0, y: 10 },
      ArrowLeft: { x: -10, y: 0 },
      ArrowRight: { x: 10, y: 0 },
      ArrowUp: { x: 0, y: -10 },
    };
    const offset = offsets[event.key];
    const element = statusRef.current;

    if (!offset || !element) return;

    event.preventDefault();
    const bounds = element.getBoundingClientRect();
    const current = position ?? { x: bounds.left, y: bounds.top };
    savePosition({
      x: Math.max(
        0,
        Math.min(window.innerWidth - bounds.width, current.x + offset.x)
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - TASKBAR_HEIGHT - bounds.height,
          current.y + offset.y
        )
      ),
    });
  };

  return (
    <aside
      ref={statusRef}
      aria-label={
        `Latência System. Tempo decorrido ${  time  }. Valor R$ 4,00.`
      }
      className="doors-session-status"
      onPointerCancel={endDrag}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      style={
        position
          ? { left: position.x, right: "auto", top: position.y }
          : undefined
      }
    >
      <div
        aria-label="Arraste para mover o contador. Use as setas do teclado para movê-lo."
        className="metrics"
        onKeyDown={moveByKeyboard}
        role="button"
        tabIndex={0}
      >
        <span>
          <strong>Tempo:</strong> <time>{time}</time>
        </span>
        <span className="brand">Latência System</span>
        <span>
          <strong>Valor:</strong> R$4,00
        </span>
      </div>
      <p className="notice">Para usar por mais tempo fale com o proprietário</p>
    </aside>
  );
};

const Desktop: FC = ({ children }) => {
  const desktopRef = useRef<HTMLElement | null>(null);
  const requestedFilesCleanupRef = useRef(false);
  const loginButtonRef = useRef<HTMLButtonElement | null>(null);
  const splashButtonRef = useRef<HTMLButtonElement | null>(null);
  const tutorialButtonRef = useRef<HTMLButtonElement | null>(null);
  const [bootStage, setBootStage] = useState<BootStage>("splash");
  const [bootDestination, setBootDestination] =
    useState<BootDestination | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startedAt, setStartedAt] = useState<null | number>(null);
  const [bonusSeconds, setBonusSeconds] = useState(0);
  const collectedKeywordsRef = useRef(new Set<string>());
  const { exists, unlink, updateFolder } = useFileSystemActions();
  const rootFs = useRootFs();
  const resetInProgressRef = useRef(false);
  const [isResetPending] = useState(() => {
    try {
      return (
        typeof window !== "undefined" &&
        window.localStorage.getItem(RESET_ON_NEXT_LOAD_KEY) === "true"
      );
    } catch {
      return false;
    }
  });
  const resetAndReload = useCallback((): void => {
    if (resetInProgressRef.current) return;
    resetInProgressRef.current = true;
    void resetStorage(rootFs)
      .catch(() => undefined)
      .finally(() => window.location.reload());
  }, [rootFs]);

  useEffect(() => {
    if (isResetPending) resetAndReload();
  }, [isResetPending, resetAndReload]);

  useEffect(() => {
    const onPageHide = (): void => {
      if (resetInProgressRef.current) return;
      const cleanup = resetStorage(rootFs);
      try {
        window.localStorage.setItem(RESET_ON_NEXT_LOAD_KEY, "true");
      } catch {
        // Reset as much of the session as browser storage permits.
      }
      void cleanup.catch(() => undefined);
    };
    const onResetStarting = (): void => {
      resetInProgressRef.current = true;
    };
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("doors-session-reset-starting", onResetStarting);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("doors-session-reset-starting", onResetStarting);
    };
  }, [rootFs]);

  useEffect(() => {
    const onKeywordCollected = (event: Event): void => {
      const keyword = (event as CustomEvent<{ keyword?: string }>).detail?.keyword?.trim();
      if (!keyword) return;
      const normalized = keyword.normalize("NFD").replace(/[\u0300-\u036F]/g, "").toLocaleLowerCase("pt-BR");
      if (collectedKeywordsRef.current.has(normalized)) return;
      collectedKeywordsRef.current.add(normalized);
      setBonusSeconds((current) => current + 2 * 60);
    };
    window.addEventListener("doors-keyword-collected", onKeywordCollected);
    return () => window.removeEventListener("doors-keyword-collected", onKeywordCollected);
  }, []);
  useWallpaper(desktopRef);

  const beginBootLoading = useCallback(
    (destination: BootDestination): void => {
      if (bootStage === "loading") return;

      setBootDestination(destination);
      setLoadingProgress(0);
      setBootStage("loading");
    },
    [bootStage]
  );

  useEffect(() => {
    if (bootStage !== "loading" || !bootDestination) return;

    const bootStartedAt = Date.now();
    const interval = window.setInterval(() => {
      const progress = Math.min(
        100,
        ((Date.now() - bootStartedAt) / BOOT_LOADING_DURATION_MS) * 100
      );
      setLoadingProgress(progress);

      if (progress === 100) {
        window.clearInterval(interval);
        setBootStage(bootDestination);
        setBootDestination(null);
      }
    }, 40);

    return () => window.clearInterval(interval);
  }, [bootDestination, bootStage]);

  useEffect(() => {
    if (!rootFs || requestedFilesCleanupRef.current) return;

    requestedFilesCleanupRef.current = true;

    const removeRequestedFiles = async (): Promise<void> => {
      try {
        if (
          window.localStorage.getItem(REQUESTED_FILES_CLEANUP_KEY) === "done"
        ) {
          return;
        }
      } catch {
        // Continue with this one-time cleanup if storage is unavailable.
      }

      const foldersToRefresh = new Set<string>();
      let cleanupCompleted = true;

      await Promise.all(
        REQUESTED_FILES_TO_REMOVE.map(async ([path, folder]) => {
          try {
            if (await exists(path) && (await unlink(path))) {
              foldersToRefresh.add(folder);
            }
          } catch {
            cleanupCompleted = false;
          }
        })
      );
      try {
        await Promise.all(
          [...foldersToRefresh].map((folder) => updateFolder(folder))
        );
      } catch {
        cleanupCompleted = false;
      }

      if (cleanupCompleted) {
        try {
          window.localStorage.setItem(REQUESTED_FILES_CLEANUP_KEY, "done");
        } catch {
          // The files stay removed for this session if storage is unavailable.
        }
      }
    };

    void removeRequestedFiles();
  }, [exists, rootFs, unlink, updateFolder]);

  useEffect(() => {
    applyAccessibilityPreferences(readAccessibilityPreferences());
  }, []);

  useEffect(() => {
    if (startedAt !== null) return;

    if (bootStage === "splash") splashButtonRef.current?.focus();
    if (bootStage === "tutorial") tutorialButtonRef.current?.focus();
    if (bootStage === "login") loginButtonRef.current?.focus();
  }, [bootStage, startedAt]);

  useEffect(() => {
    const isSplashActive = startedAt === null && bootStage === "splash";
    const startTutorial = (event: KeyboardEvent): void => {
      if (
        event.key === "Tab" ||
        event.key === "Shift" ||
        event.key === "Control" ||
        event.key === "Alt" ||
        event.key === "Meta"
      ) {
        return;
      }

      event.preventDefault();
      beginBootLoading("tutorial");
    };

    if (isSplashActive) {
      window.addEventListener("keydown", startTutorial, true);
    }

    const cleanup = isSplashActive
      ? () => window.removeEventListener("keydown", startTutorial, true)
      : undefined;
    return cleanup;
  }, [beginBootLoading, bootStage, startedAt]);

  const startSession = (): void =>
    setStartedAt((current) => current ?? Date.now());

  return (
    <StyledDesktop
      ref={desktopRef}
      aria-label="Área de trabalho do Doors"
      style={isResetPending ? { visibility: "hidden" } : undefined}
    >
      <LockedFolderProvider>
        <FileManager
          url={DESKTOP_PATH}
          allowMovingDraggableEntries
          hideLoading
          hideScrolling
          isDesktop
          loadIconsImmediately
        />
        {children}
      </LockedFolderProvider>
      {startedAt !== null && <SessionStatus bonusSeconds={bonusSeconds} startedAt={startedAt} />}
      {startedAt === null && (
        <>
          {bootStage === "loading" && (
            <section
              aria-busy="true"
              aria-label="Carregando"
              className="doors-boot-screen doors-intro-screen doors-loading-screen"
              role="status"
            >
              <div className="doors-loading-content">
                <div
                  aria-label="Progresso do carregamento"
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={Math.round(loadingProgress)}
                  className="doors-loading-progress"
                  role="progressbar"
                >
                  <img
                    alt=""
                    className="doors-loading-image"
                    draggable={false}
                    src={
                      BOOT_LOADING_FRAMES[
                        Math.min(
                          BOOT_LOADING_FRAMES.length - 1,
                          Math.floor(
                            (loadingProgress * BOOT_LOADING_FRAMES.length) / 100
                          )
                        )
                      ]
                    }
                  />
                </div>
                <span>Carregando...</span>
              </div>
            </section>
          )}

          {bootStage === "splash" && (
            <section
              aria-label="Tela inicial Latência System"
              aria-modal="true"
              className="doors-boot-screen doors-intro-screen doors-splash-screen"
              role="dialog"
            >
              <div className="doors-splash-stack">
                <div className="doors-splash-window">
                  <header className="doors-splash-titlebar">
                    <WindowControls />
                  </header>
                  <div className="doors-splash-brand">
                    <img
                      alt="Latência System, Lan house"
                      className="doors-splash-logo"
                      src="/System/Doors/latencia-logo.svg"
                    />
                  </div>
                </div>
                <button
                  ref={splashButtonRef}
                  className="doors-splash-start"
                  onClick={() => beginBootLoading("tutorial")}
                  type="button"
                >
                  aperte qualquer tecla para iniciar
                </button>
              </div>
            </section>
          )}

          {bootStage === "tutorial" && (
            <section
              aria-label="Tutorial do jogo"
              aria-modal="true"
              className="doors-boot-screen doors-intro-screen doors-tutorial-screen"
              role="dialog"
            >
              <div className="doors-tutorial-window">
                <header className="doors-tutorial-titlebar">
                  <span>Tutorial do jogo</span>
                  <WindowControls />
                </header>
                <div className="doors-tutorial-content">
                  <aside className="doors-tutorial-about">
                    <span
                      aria-hidden="true"
                      className="doors-tutorial-about-icon"
                    >
                      ?
                    </span>
                    <div>
                      <h2>O QUE É ESTE SITE?</h2>
                      <p>
                        Esta experiência simula como era os Lan House, espaços
                        que, entre o fim dos anos 1990 e o início dos anos 2010,
                        eram espaços que democratizaram o acesso à internet nos
                        periféricos brasileiros, conectando a população ao mundo
                        digital por meio de jogos, descobertas e trocas coletivas.
                      </p>
                    </div>
                  </aside>
                  <div className="doors-tutorial-steps">
                    <article className="doors-tutorial-step">
                      <h2>
                        <span className="doors-tutorial-number"><img alt="" aria-hidden="true" src="/System/Doors/circle.svg" /><span>1</span></span>
                        <span>Navegue pelos sites</span>
                      </h2>
                      <p>
                        Acesse os diferentes sites e programas da Lan house, e
                        procure pelas <span>palavras-chaves</span> escondidas.
                      </p>
                    </article>
                    <span aria-hidden="true" className="doors-tutorial-arrow">
                      &gt;
                    </span>
                    <article className="doors-tutorial-step">
                      <h2>
                        <span className="doors-tutorial-number"><img alt="" aria-hidden="true" src="/System/Doors/circle.svg" /><span>2</span></span>
                        <span>Palavras-chaves</span>
                      </h2>
                      <p>
                        Cada palavra-chave está escondida no conteúdo de cada
                        site. Leia, assista, pesquise e <span>fique atento</span>{" "}
                        ao mouse para encontrá-las.
                      </p>
                    </article>
                    <span aria-hidden="true" className="doors-tutorial-arrow">
                      &gt;
                    </span>
                    <article className="doors-tutorial-step">
                      <h2>
                        <span className="doors-tutorial-number"><img alt="" aria-hidden="true" src="/System/Doors/circle.svg" /><span>3</span></span>
                        <span>Pegue as 5 chaves</span>
                      </h2>
                      <p>
                        Encontre as 5 palavras em até 5 minutos. Com todas as
                        chaves, a <span>pasta trancada</span> será desbloqueada.
                      </p>
                    </article>
                  </div>
                  <button
                    ref={tutorialButtonRef}
                    className="doors-tutorial-start"
                    onClick={() => beginBootLoading("login")}
                    type="button"
                  >
                    Entendi, começar a jogar
                  </button>
                </div>
              </div>
            </section>
          )}

          {bootStage === "login" && (
            <section
              aria-label="Tela de login do Doors"
              aria-modal="true"
              className="doors-boot-screen doors-login-screen"
              role="dialog"
            >
              <div aria-hidden="true" className="doors-login-top" />
              <div className="doors-login-content">
                <div className="doors-login-intro">
                  <img
                    alt="Doors — Sistema operacional"
                    className="doors-login-wordmark"
                    src="/System/Doors/figma/login-door-wordmark.png"
                  />
                  <p>Para começar, escolha um usuário</p>
                </div>
                <img
                  alt=""
                  aria-hidden="true"
                  className="doors-login-divider"
                  src="/System/Doors/figma/login-divider.svg"
                />
                <button
                  ref={loginButtonRef}
                  aria-label="Entrar como Administrador"
                  className="doors-login-user"
                  onClick={startSession}
                  type="button"
                >
                  <img
                    alt=""
                    className="doors-login-avatar"
                    src="/System/Doors/figma/login-avatar-tree.png"
                  />
                  <span className="doors-login-user-name">Administrador</span>
                  <span aria-hidden="true" className="doors-login-next">
                    <img
                      alt=""
                      src="/System/Doors/figma/tutorial-right-arrow.svg"
                    />
                  </span>
                </button>
              </div>
              <div aria-hidden="true" className="doors-login-bottom" />
              <button
                aria-label="Desligar o computador e voltar à tela de login"
                className="doors-shutdown"
                onClick={resetAndReload}
                type="button"
              >
                <img
                  alt=""
                  aria-hidden="true"
                  src="/System/Doors/figma/desligar.svg"
                />
              </button>
            </section>
          )}
        </>
      )}
    </StyledDesktop>
  );
};

export default Desktop;
