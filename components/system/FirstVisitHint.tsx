import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FirstVisitHintProps = {
  active: boolean;
  eventKey: string;
  message: string;
};

const FirstVisitHint: FC<FirstVisitHintProps> = ({
  active,
  eventKey,
  message,
}) => {
  const [visible, setVisible] = useState(false);
  const handledKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    if (handledKeyRef.current === eventKey) return;

    handledKeyRef.current = eventKey;
    const storageKey = `doors-first-visit:${eventKey}`;
    try {
      if (window.localStorage.getItem(storageKey) === "shown") return;
      window.localStorage.setItem(storageKey, "shown");
    } catch {
      // Keep the hint available when browser storage is disabled.
    }
    setVisible(true);
  }, [active, eventKey]);

  useEffect(() => {
    if (!visible) return;
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setVisible(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [visible]);

  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div className="doors-first-visit-overlay">
      <section
        aria-label="Dica de palavra-chave"
        aria-modal="false"
        className="doors-first-visit-window"
        role="dialog"
      >
        <header className="doors-first-visit-titlebar">
          <span>Dica</span>
          <span aria-hidden="true">+</span>
        </header>
        <p>{message}</p>
        <button
          onClick={() => setVisible(false)}
          type="button"
        >
          Entendi
        </button>
      </section>
    </div>,
    document.body
  );
};

export default FirstVisitHint;
