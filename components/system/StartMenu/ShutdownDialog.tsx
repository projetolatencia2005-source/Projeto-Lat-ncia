import { useEffect, useRef, useState } from "react";
import StyledShutdownDialog from "components/system/StartMenu/StyledShutdownDialog";

type ShutdownDialogProps = {
  cancelRef: React.RefObject<HTMLButtonElement | null>;
  onCancel: () => void;
  onConfirm: () => void;
};

type DialogPosition = { x: number; y: number };

type DialogDrag = {
  pointerId: number;
  startX: number;
  startY: number;
  left: number;
  top: number;
  width: number;
  height: number;
  origin: DialogPosition;
};

const ShutdownDialog: FC<ShutdownDialogProps> = ({
  cancelRef,
  onCancel,
  onConfirm,
}) => {
  const confirmRef = useRef<HTMLButtonElement | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState<DialogPosition>({ x: 0, y: 0 });
  const dragRef = useRef<DialogDrag | null>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, [cancelRef]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();

    if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  const startDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    if (
      event.button !== 0 ||
      (event.target instanceof Element && event.target.closest("button"))
    ) {
      return;
    }

    const dialog = event.currentTarget.parentElement;
    if (!dialog) return;

    const { height, left, top, width } = dialog.getBoundingClientRect();
    dragRef.current = {
      height,
      left,
      origin: dragOffset,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      top,
      width,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const moveDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const left = Math.max(
      0,
      Math.min(
        window.innerWidth - drag.width,
        drag.left + event.clientX - drag.startX
      )
    );
    const top = Math.max(
      0,
      Math.min(
        window.innerHeight - drag.height,
        drag.top + event.clientY - drag.startY
      )
    );

    setDragOffset({
      x: drag.origin.x + left - drag.left,
      y: drag.origin.y + top - drag.top,
    });
  };

  const endDrag: React.PointerEventHandler<HTMLElement> = (event) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  return (
    <StyledShutdownDialog
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
      onKeyDown={onKeyDown}
    >
      <section
        aria-labelledby="doors-shutdown-title"
        aria-modal="true"
        className={`doors-shutdown-window${isMaximized ? " is-maximized" : ""}${isMinimized ? " is-minimized" : ""}`}
        role="alertdialog"
        style={{ transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)` }}
      >
        <header
          className="doors-shutdown-titlebar"
          onPointerCancel={endDrag}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
        >
          <strong id="doors-shutdown-title">Atenção</strong>
          <div className="doors-shutdown-window-actions">
            <button
              aria-label={isMinimized ? "Restaurar" : "Minimizar"}
              onClick={() => setIsMinimized((current) => !current)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                src="/System/Doors/figma/window-control-minimize.svg"
              />
            </button>
            <button
              aria-label={isMaximized ? "Restaurar tamanho" : "Maximizar"}
              onClick={() => setIsMaximized((current) => !current)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                src="/System/Doors/figma/window-control-maximize.svg"
              />
            </button>
            <button aria-label="Fechar" onClick={onCancel} type="button">
              <img
                alt=""
                aria-hidden="true"
                src="/System/Doors/figma/window-control-close.svg"
              />
            </button>
          </div>
        </header>
        {!isMinimized && (
          <div className="doors-shutdown-content">
            <h2>Você quer mesmo desligar o computador?</h2>
            <p>Se você desligar o computador, você perderá todo o progresso!</p>
            <div className="doors-shutdown-actions">
              <button
                className="doors-shutdown-confirm"
                onClick={onConfirm}
                ref={confirmRef}
                type="button"
              >
                Sim, quero desligar!
              </button>
              <button
                className="doors-shutdown-cancel"
                onClick={onCancel}
                ref={cancelRef}
                type="button"
              >
                Não, não quero desligar!
              </button>
            </div>
          </div>
        )}
      </section>
    </StyledShutdownDialog>
  );
};

export default ShutdownDialog;
