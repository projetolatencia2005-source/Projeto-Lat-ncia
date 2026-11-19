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
  const [position, setPosition] = useState<null | { x: number; y: number }>(null);
  const handledKeyRef = useRef<string | null>(null);
  const dragRef = useRef<null | {
    height: number;
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
    width: number;
  }>(null);
  useEffect(() => {
    if (!active) {
      setVisible(false);
      setPosition(null);
      dragRef.current = null;
      return;
    }
    if (handledKeyRef.current === eventKey) return;

    handledKeyRef.current = eventKey;
    setPosition(null);
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

  const startDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    if (event.button !== 0) return;

    const dialog = event.currentTarget.parentElement;
    if (!dialog) return;

    const { height, left, top, width } = dialog.getBoundingClientRect();
    dragRef.current = {
      height,
      originX: left,
      originY: top,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width,
    };
    setPosition({ x: left, y: top });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };
  const moveDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setPosition({
      x: Math.max(
        0,
        Math.min(
          window.innerWidth - drag.width,
          drag.originX + event.clientX - drag.startX
        )
      ),
      y: Math.max(
        0,
        Math.min(
          window.innerHeight - drag.height,
          drag.originY + event.clientY - drag.startY
        )
      ),
    });
  };
  const endDrag: React.PointerEventHandler<HTMLElement> = () => {
    dragRef.current = null;
  };

  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <div className="doors-first-visit-overlay">
      <section
        aria-label="Dica de palavra-chave"
        aria-modal="false"
        className="doors-first-visit-window"
        role="dialog"
        style={
          position
            ? {
                left: position.x,
                margin: 0,
                position: "fixed",
                top: position.y,
                transform: "none",
              }
            : undefined
        }
      >
        <header
          className="doors-first-visit-titlebar"
          onPointerCancel={endDrag}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
        >
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
