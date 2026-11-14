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
const KEYWORD_GIF_DURATION_MS = 8000;
const KEYWORD_OVERLAY_FADE_MS = 500;
const KEYWORD_NOTICE_TYPING_INTERVAL_MS = 45;
const KEYWORD_NOTICE_CHARACTERS_PER_TICK = 1;
type KeywordNoticePart = { text: string; strong?: boolean };
const KEYWORD_NOTICE_PARAGRAPHS: KeywordNoticePart[][] = [
  [
    { text: "Você sabia que: ", strong: true },
    { text: "as Lan Houses tiveram um papel importante na " },
    { text: "alfabetização digital", strong: true },
    { text: ", permitindo que muitas pessoas aprendessem a utilizar computadores, digitar textos, pesquisar na internet e explorar programas como o Word." },
  ],
  [
    { text: "Para quem não tinha acesso à tecnologia em casa, esses espaços representavam uma oportunidade de desenvolver novas habilidades e " },
    { text: "conquistar mais autonomia", strong: true },
    { text: "." },
  ],
  [
    { text: "Mais do que acessar a internet, era aprender a utilizar a tecnologia para estudar, trabalhar e se comunicar." },
  ],
];
const KEYWORD_NOTICE_ACCESSIBLE_TEXT = KEYWORD_NOTICE_PARAGRAPHS
  .map((paragraph) => paragraph.map((part) => part.text).join(""))
  .join("\n\n");
const KEYWORD_NOTICE_TOTAL_CHARACTERS = KEYWORD_NOTICE_PARAGRAPHS.reduce(
  (total, paragraph) =>
    total + paragraph.reduce((paragraphTotal, part) => paragraphTotal + part.text.length, 0),
  0,
);
type KeywordOverlayPhase = "hidden" | "playing" | "notice" | "dismissing";
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
  const [tutorialPage, setTutorialPage] = useState(0);
  const [bootDestination, setBootDestination] =
    useState<BootDestination | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [startedAt, setStartedAt] = useState<null | number>(null);
  const [bonusSeconds, setBonusSeconds] = useState(0);
  const [keywordOverlayPhase, setKeywordOverlayPhase] =
    useState<KeywordOverlayPhase>("hidden");
  const [typedNoticeCharacters, setTypedNoticeCharacters] = useState(0);
  const [keywordGifSequence, setKeywordGifSequence] = useState(0);
  const keywordGifSequenceRef = useRef(0);
  const keywordGifTimeoutRef = useRef<null | number>(null);
  const collectedKeywordsRef = useRef(new Set<string>());
  const { exists, unlink, updateFolder } = useFileSystemActions();
  const rootFs = useRootFs();
  const resetInProgressRef = useRef(false);
  const resetAndReload = useCallback((): void => {
    if (resetInProgressRef.current) return;
    resetInProgressRef.current = true;
    void resetStorage(rootFs)
      .catch(console.error)
      .finally(() => window.location.reload());
  }, [rootFs]);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(RESET_ON_NEXT_LOAD_KEY) === "true") {
        desktopRef.current?.style.setProperty("visibility", "hidden");
        resetAndReload();
      }
    } catch {
      // Keep the session usable when browser storage is unavailable.
    }
  }, [resetAndReload]);

  useEffect(() => {
    const onPageHide = (): void => {
      if (resetInProgressRef.current) return;
      const cleanup = resetStorage(rootFs);
      try {
        window.localStorage.setItem(RESET_ON_NEXT_LOAD_KEY, "true");
      } catch {
        // Reset as much of the session as browser storage permits.
      }
      void cleanup.catch(console.error);
    };
    const onResetStarting = (): void => {
      resetInProgressRef.current = true;
    };
    const onPageShow = (event: PageTransitionEvent): void => {
      if (!event.persisted || resetInProgressRef.current) return;
      resetInProgressRef.current = true;
      window.location.reload();
    };
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("doors-session-reset-starting", onResetStarting);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("doors-session-reset-starting", onResetStarting);
    };
  }, [rootFs]);

  useEffect(() => {
    const onKeywordCollected = (event: Event): void => {
      const keyword = (event as CustomEvent<{ keyword?: string }>).detail?.keyword?.trim();
      if (!keyword) return;
      const normalized = keyword
        .normalize("NFD")
        .replace(/[\u0300-\u036F]/g, "")
        .toLocaleLowerCase("pt-BR");
      if (collectedKeywordsRef.current.has(normalized)) return;

      collectedKeywordsRef.current.add(normalized);
      setBonusSeconds((current) => current + 2 * 60);
      const nextSequence = keywordGifSequenceRef.current + 1;
      keywordGifSequenceRef.current = nextSequence;
      setKeywordGifSequence(nextSequence);
      setTypedNoticeCharacters(0);
      setKeywordOverlayPhase("playing");

      if (keywordGifTimeoutRef.current !== null) {
        window.clearTimeout(keywordGifTimeoutRef.current);
        keywordGifTimeoutRef.current = null;
      }
    };

    window.addEventListener("doors-keyword-collected", onKeywordCollected);
    return () => {
      window.removeEventListener("doors-keyword-collected", onKeywordCollected);
      if (keywordGifTimeoutRef.current !== null) {
        window.clearTimeout(keywordGifTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (keywordOverlayPhase !== "notice") return;

    let currentCharacters = 0;
    const typingInterval = window.setInterval(() => {
      currentCharacters = Math.min(
        currentCharacters + KEYWORD_NOTICE_CHARACTERS_PER_TICK,
        KEYWORD_NOTICE_TOTAL_CHARACTERS,
      );
      setTypedNoticeCharacters(currentCharacters);
      if (currentCharacters >= KEYWORD_NOTICE_TOTAL_CHARACTERS) {
        window.clearInterval(typingInterval);
      }
    }, KEYWORD_NOTICE_TYPING_INTERVAL_MS);

    return () => window.clearInterval(typingInterval);
  }, [keywordOverlayPhase]);

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
      setTutorialPage(0);
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

  const continueFromKeywordNotice = (): void => {
    if (keywordGifTimeoutRef.current !== null) {
      window.clearTimeout(keywordGifTimeoutRef.current);
    }
    setKeywordOverlayPhase("dismissing");
    keywordGifTimeoutRef.current = window.setTimeout(() => {
      setKeywordOverlayPhase("hidden");
      keywordGifTimeoutRef.current = null;
    }, KEYWORD_OVERLAY_FADE_MS);
  };

  return (
    <StyledDesktop
      ref={desktopRef}
      aria-label="Área de trabalho do Doors"
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
      {keywordOverlayPhase !== "hidden" && (
        <div
          className={"doors-keyword-gif-overlay doors-keyword-gif-overlay--" + keywordOverlayPhase}
          key={keywordGifSequence}
        >
          {keywordOverlayPhase === "playing" ? (
            <img
              alt=""
              draggable={false}
              onError={() => {
                if (keywordGifSequenceRef.current === keywordGifSequence) {
                  setKeywordOverlayPhase("hidden");
                }
              }}
              onLoad={() => {
                if (keywordGifSequenceRef.current !== keywordGifSequence) return;
                if (keywordGifTimeoutRef.current !== null) {
                  window.clearTimeout(keywordGifTimeoutRef.current);
                }
                keywordGifTimeoutRef.current = window.setTimeout(() => {
                  setKeywordOverlayPhase("notice");
                  keywordGifTimeoutRef.current = null;
                }, KEYWORD_GIF_DURATION_MS);
              }}
              src="/System/Doors/Chave.gif"
            />
          ) : (
            <section
              aria-describedby="doors-keyword-notice-description"
              aria-labelledby="doors-keyword-notice-title"
              aria-modal="true"
              className="doors-keyword-notice"
              role="dialog"
            >
              <h2
                className="doors-keyword-notice-sr-only"
                id="doors-keyword-notice-title"
              >
                Informação sobre a palavra-chave
              </h2>
              <p
                className="doors-keyword-notice-sr-only"
                id="doors-keyword-notice-description"
              >
                {KEYWORD_NOTICE_ACCESSIBLE_TEXT}
              </p>
              <div aria-hidden="true" className="doors-keyword-notice-copy">
                {(() => {
                  let paragraphStart = 0;
                  return KEYWORD_NOTICE_PARAGRAPHS.map((paragraph, paragraphIndex) => {
                    const paragraphLength = paragraph.reduce(
                      (total, part) => total + part.text.length,
                      0,
                    );
                    const paragraphEnd = paragraphStart + paragraphLength;
                    let partStart = paragraphStart;
                    const isTypingParagraph =
                      typedNoticeCharacters > paragraphStart &&
                      typedNoticeCharacters <= paragraphEnd;
                    const renderedParagraph = (
                      <p key={paragraphIndex}>
                        {paragraph.map((part, partIndex) => {
                          const visibleCharacters = Math.max(
                            0,
                            Math.min(part.text.length, typedNoticeCharacters - partStart),
                          );
                          partStart += part.text.length;
                          const content = part.text.slice(0, visibleCharacters);
                          return part.strong ? (
                            <strong key={partIndex}>{content}</strong>
                          ) : (
                            <span key={partIndex}>{content}</span>
                          );
                        })}
                        {isTypingParagraph && (
                          <span className="doors-keyword-notice-caret" />
                        )}
                      </p>
                    );
                    paragraphStart = paragraphEnd;
                    return renderedParagraph;
                  });
                })()}
              </div>
              {typedNoticeCharacters >= KEYWORD_NOTICE_TOTAL_CHARACTERS && (
                <button
                  className="doors-keyword-notice-continue"
                  onClick={continueFromKeywordNotice}
                  type="button"
                >
                  Continuar
                </button>
              )}
            </section>
          )}
        </div>
      )}
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
                  onClick={() => {
                    setTutorialPage(0);
                    beginBootLoading("tutorial");
                  }}
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
                <div className="doors-tutorial-content doors-tutorial-content-multipage">
                {tutorialPage === 0 ? (
                  <article
                    key="intro"
                    aria-live="polite"
                    className="doors-tutorial-slide doors-tutorial-slide-intro"
                  >
                    <div className="doors-tutorial-intro-top">
                      <span
                        aria-hidden="true"
                        className="doors-tutorial-question"
                      >
                        ?
                      </span>
                      <div className="doors-tutorial-intro-copy">
                        <h1>O QUE É ESTE SITE?</h1>
                        <p>
                          Esta experiência simula como eram as Lan Houses,
                          espaços que, entre o fim dos anos 1990 e o início dos
                          anos 2010, democratizaram o acesso à internet.
                        </p>
                      </div>
                    </div>
                    <p className="doors-tutorial-intro-summary">
                      Nas periferias brasileiras, conectaram uma geração ao
                      mundo digital por meio de jogos, descobertas e trocas
                      coletivas.
                    </p>
                  </article>
                ) : (
                  <article
                    key={`step-${tutorialPage}`}
                    aria-live="polite"
                    className={`doors-tutorial-slide doors-tutorial-slide-step-${tutorialPage}`}
                  >
                    <div className="doors-tutorial-step-copy">
                      <span
                        aria-label={`Etapa ${tutorialPage} de 3`}
                        className="doors-tutorial-step-number"
                      >
                        {tutorialPage}
                      </span>
                      {tutorialPage === 1 && (
                        <p>
                          Acesse os diferentes sites e programas da Lan house e
                          procure pelas <span>palavras-chaves</span>. A dica
                          sobre onde encontrá-las está no <span>post-it</span>.
                        </p>
                      )}
                      {tutorialPage === 2 && (
                        <p>
                          Cada <span>palavra-chave</span> está escondida no
                          conteúdo de cada site ou programa. Leia, assista e
                          pesquise; fique atento aos textos e às imagens.
                        </p>
                      )}
                      {tutorialPage === 3 && (
                        <p>
                          Encontre as <span>5 palavras</span> em até 5 minutos.
                          A cada palavra encontrada, você ganha 2 minutos.
                          <br />
                          <br />
                          Com todas as chaves, a <span>pasta trancada</span>{" "}
                          será desbloqueada.
                        </p>
                      )}
                    </div>
                    <div
                      aria-label="Prévia da área de trabalho com espaço para GIF"
                      className="doors-tutorial-desktop-preview"
                      role="img"
                    >
                      <img
                        alt=""
                        className="doors-tutorial-wallpaper"
                        src="/System/Doors/latencia-pixel-hills.png"
                      />
                      <div
                        aria-hidden="true"
                        className="doors-tutorial-preview-icons"
                      >
                        <span className="doors-tutorial-preview-icon">
                          <img
                            alt=""
                            className="doors-tutorial-preview-icon-image"
                            src="/System/Doors/figma/icon-trash.png"
                          />
                          Lixeira
                        </span>
                        <span className="doors-tutorial-preview-icon">
                          <img
                            alt=""
                            className="doors-tutorial-preview-icon-image"
                            src="/System/Doors/figma/icon-documents.png"
                          />
                          Textos
                        </span>
                        <span className="doors-tutorial-preview-icon">
                          <img
                            alt=""
                            className="doors-tutorial-preview-icon-image"
                            src="/System/Doors/figma/icon-post-it.png"
                          />
                          Post-it
                        </span>
                        <span className="doors-tutorial-preview-icon">
                          <img
                            alt=""
                            className="doors-tutorial-preview-icon-image"
                            src="/System/Doors/figma/icon-internet-expanded.png"
                          />
                          Internet
                        </span>
                        <span className="doors-tutorial-preview-icon">
                          <img
                            alt=""
                            className="doors-tutorial-preview-icon-image"
                            src="/System/Doors/figma/icon-locked-folder.svg"
                          />
                          Pasta trancada
                        </span>
                      </div>
                      <div
                        aria-label="Espaço reservado para o GIF desta etapa"
                        className="doors-tutorial-gif-slot"
                        data-tutorial-gif-slot
                      >
                        gif
                      </div>
                      <div
                        aria-hidden="true"
                        className="doors-tutorial-preview-taskbar"
                      >
                        <span className="doors-tutorial-preview-start">
                          <img
                            alt=""
                            src="/System/Doors/figma/door-taskbar-source.png"
                          />
                          Abrir porta
                        </span>
                        <span className="doors-tutorial-preview-tray">
                          ● ◉ ◌ <span className="doors-tutorial-preview-date">16:00<br />03/10/08</span>
                        </span>
                      </div>
                    </div>
                  </article>
                )}
                <nav aria-label="Navegação do tutorial" className="doors-tutorial-actions">
                  {tutorialPage > 0 && (
                    <button
                      aria-label="Voltar para a tela anterior do tutorial"
                      className="doors-tutorial-back"
                      onClick={() => setTutorialPage((page) => page - 1)}
                      type="button"
                    >
                      ← Voltar
                    </button>
                  )}
                  <button
                    ref={tutorialButtonRef}
                    className={`doors-tutorial-start${
                      tutorialPage === 3 ? " doors-tutorial-start-final" : ""
                    }`}
                    onClick={() => {
                      if (tutorialPage < 3) {
                        setTutorialPage((page) => page + 1);
                        return;
                      }

                      beginBootLoading("login");
                    }}
                    type="button"
                  >
                    {tutorialPage === 3
                      ? "Entendi, começar o jogo!"
                      : "Continuar"}
                  </button>
                </nav>
              </div>
            
              </div>
            </section>
          )}{bootStage === "login" && (
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
