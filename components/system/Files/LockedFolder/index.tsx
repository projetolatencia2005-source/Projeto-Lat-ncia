import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  LOCKED_FOLDER_QUIZ_KEYWORDS,
  LOCKED_FOLDER_WORDS,
} from "components/system/Files/LockedFolder/constants";
import StyledLockedFolderDialog from "components/system/Files/LockedFolder/StyledLockedFolderDialog";
import { getDoorsCollectedKeywords } from "utils/doorsKeywords";

type RequestAccess = (onUnlocked: () => void) => void;

type DialogDragState = {
  offsetX: number;
  offsetY: number;
  pointerId: number;
  startX: number;
  startY: number;
};

const RequestAccessContext = createContext<RequestAccess>((onUnlocked) =>
  onUnlocked()
);

const normalizeWord = (word: string): string =>
  word
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");

const inputIndexForKeyword = (keyword: string): number => {
  const normalized = normalizeWord(keyword);
  const wordIndex = LOCKED_FOLDER_WORDS.findIndex(
    (word) => normalizeWord(word) === normalized
  );
  if (wordIndex >= 0) return wordIndex;
  return LOCKED_FOLDER_QUIZ_KEYWORDS.some(
    (word) => normalizeWord(word) === normalized
  ) ? 0 : -1;
};

const canonicalKeyword = (keyword: string): string => {
  const normalized = normalizeWord(keyword);
  return (
    [...LOCKED_FOLDER_WORDS, ...LOCKED_FOLDER_QUIZ_KEYWORDS].find(
      (word) => normalizeWord(word) === normalized
    ) || keyword
  );
};

const LockedFolderProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [words, setWords] = useState<string[]>(() =>
    LOCKED_FOLDER_WORDS.map(() => "")
  );
  const [error, setError] = useState("");
  const [onUnlocked, setOnUnlocked] = useState<(() => void) | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const dragStateRef = useRef<DialogDragState | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const requestAccess = useCallback<RequestAccess>((callback) => {
    if (isUnlocked) {
      callback();
      return;
    }

    setError("");
    setDragOffset({ x: 0, y: 0 });
    setOnUnlocked(() => callback);
    setIsOpen(true);
  }, [isUnlocked]);

  useEffect(() => {
    const applyKeyword = (keyword: string): void => {
      const index = inputIndexForKeyword(keyword);
      if (index < 0) return;
      const value = canonicalKeyword(keyword);
      setWords((current) =>
        current.map((word, wordIndex) => wordIndex === index ? value : word)
      );
      setError("");
    };
    const syncStoredKeywords = (): void => {
      getDoorsCollectedKeywords().forEach(applyKeyword);
    };
    const onKeywordCollected = (event: Event): void => {
      const keyword = (event as CustomEvent<{ keyword?: string }>).detail?.keyword;
      if (keyword) applyKeyword(keyword);
      else syncStoredKeywords();
    };

    syncStoredKeywords();
    window.addEventListener("doors-keyword-collected", onKeywordCollected);
    return () => window.removeEventListener("doors-keyword-collected", onKeywordCollected);
  }, []);

  useEffect(() => {
    if (isOpen) firstInputRef.current?.focus();
  }, [isOpen]);

  const close = (): void => {
    setIsOpen(false);
    setOnUnlocked(null);
  };

  const submit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const enteredWords = words.filter((word) => word.trim());
    const matchesQuizKeyword =
      enteredWords.length === 1 &&
      LOCKED_FOLDER_QUIZ_KEYWORDS.some(
        (keyword) => normalizeWord(enteredWords[0] || "") === normalizeWord(keyword)
      );
    const matchesAllWords = words.every(
      (word, index) =>
        normalizeWord(word) ===
        normalizeWord(LOCKED_FOLDER_WORDS[index] || "")
    );

    if (!matchesQuizKeyword && !matchesAllWords) {
      setError("A palavra-chave ou as cinco palavras não correspondem. Tente novamente.");
      return;
    }

    setIsUnlocked(true);
    const continueOpening = onUnlocked;
    setIsOpen(false);
    setOnUnlocked(null);
    continueOpening?.();
  };

  const updateWord = (index: number, value: string): void => {
    setWords((current) =>
      current.map((word, wordIndex) =>
        wordIndex === index ? value : word
      )
    );
    setError("");
  };

  const onDialogKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Escape") close();
  };

  const onTitlebarPointerDown: React.PointerEventHandler<HTMLElement> = (
    event
  ) => {
    if (
      event.button !== 0 ||
      (event.target as HTMLElement).closest("button")
    ) {
      return;
    }

    dragStateRef.current = {
      offsetX: dragOffset.x,
      offsetY: dragOffset.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const onTitlebarPointerMove: React.PointerEventHandler<HTMLElement> = (
    event
  ) => {
    const drag = dragStateRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    const rect = dialogRef.current?.getBoundingClientRect();
    const maxX = rect ? Math.max(0, (window.innerWidth - rect.width) / 2 - 8) : 0;
    const maxY = rect ? Math.max(0, (window.innerHeight - rect.height) / 2 - 8) : 0;
    const nextX = drag.offsetX + event.clientX - drag.startX;
    const nextY = drag.offsetY + event.clientY - drag.startY;

    setDragOffset({
      x: Math.max(-maxX, Math.min(maxX, nextX)),
      y: Math.max(-maxY, Math.min(maxY, nextY)),
    });
  };

  const finishDragging: React.PointerEventHandler<HTMLElement> = (event) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null;
    }
  };

  return (
    <RequestAccessContext.Provider value={requestAccess}>
      {children}
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <StyledLockedFolderDialog
            onKeyDown={onDialogKeyDown}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <section
              ref={dialogRef}
              aria-labelledby="doors-locked-folder-title"
              aria-modal="true"
              className="doors-locked-folder-window"
              role="dialog"
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
              }}
            >
              <header
                className="doors-locked-folder-titlebar"
                onLostPointerCapture={finishDragging}
                onPointerCancel={finishDragging}
                onPointerDown={onTitlebarPointerDown}
                onPointerMove={onTitlebarPointerMove}
                onPointerUp={finishDragging}
              >
                <div className="doors-locked-folder-title">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="doors-locked-folder-icon"
                    src="/System/Doors/trancada.svg"
                  />
                  <span id="doors-locked-folder-title">Não abra.</span>
                </div>
                <button
                  aria-label="Fechar"
                  className="doors-locked-folder-close"
                  onClick={close}
                  type="button"
                >
                  ×
                </button>
              </header>
              <form className="doors-locked-folder-form" onSubmit={submit}>
                <p className="doors-locked-folder-prompt">
                  Digite a palavra-chave liberada pela prova ou as cinco palavras encontradas no jogo.
                </p>
                <div className="doors-locked-folder-words">
                  {words.map((word, index) => (
                    <input
                      key={LOCKED_FOLDER_WORDS[index]}
                      ref={index === 0 ? firstInputRef : undefined}
                      aria-label={`Palavra ${index + 1}`}
                      autoCapitalize="none"
                      autoComplete="off"
                      className="doors-locked-folder-input"
                      maxLength={32}
                      onChange={(event) => updateWord(index, event.target.value)}
                      placeholder={`Palavra 0${index + 1}`}
                      spellCheck={false}
                      type="text"
                      value={word}
                    />
                  ))}
                </div>
                <p aria-live="polite" className="doors-locked-folder-error">
                  {error}
                </p>
                <div className="doors-locked-folder-actions">
                  <button
                    className="doors-locked-folder-submit"
                    disabled={words.every((word) => !word.trim())}
                    type="submit"
                  >
                    Desbloquear
                  </button>
                </div>
              </form>
            </section>
          </StyledLockedFolderDialog>,
          document.body
        )}
    </RequestAccessContext.Provider>
  );
};

export const useRequestLockedFolderAccess = (): RequestAccess =>
  useContext(RequestAccessContext);

export default LockedFolderProvider;
