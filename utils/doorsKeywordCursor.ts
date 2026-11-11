import { type CursorEffectResult, fairyDustCursor } from "cursor-effects";

export const attachDoorsKeywordCursorEffect = (
  target: HTMLElement
): (() => void) => {
  const sourceDocument = target.ownerDocument;
  const sourceWindow = sourceDocument.defaultView;
  const prefersReducedMotion =
    sourceWindow?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? false;

  if (!sourceWindow || prefersReducedMotion) return () => {};

  let overlayDocument: Document = sourceDocument;
  let overlayWindow: Window = sourceWindow;

  try {
    overlayWindow = sourceWindow.parent;
    overlayDocument = overlayWindow.document;
  } catch {
    // Use the source document when the parent frame is unavailable.
  }

  const host = overlayDocument.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.position = "fixed";
  host.style.inset = "0";
  host.style.width = "100vw";
  host.style.height = "100vh";
  host.style.pointerEvents = "none";
  host.style.zIndex = "2147483647";
  overlayDocument.documentElement.append(host);

  const effect: CursorEffectResult = fairyDustCursor({
    colors: ["#f7edd7", "#86baff", "#7d94b8"],
    element: host,
  });
  const relayMouseMove = ({ clientX, clientY }: MouseEvent): void => {
    const frame = sourceWindow.frameElement;
    const rect = frame?.getBoundingClientRect();
    const scaleX = rect && sourceWindow.innerWidth
      ? rect.width / sourceWindow.innerWidth
      : 1;
    const scaleY = rect && sourceWindow.innerHeight
      ? rect.height / sourceWindow.innerHeight
      : 1;
    host.dispatchEvent(
      new overlayWindow.MouseEvent("mousemove", {
        clientX: rect ? rect.left + clientX * scaleX : clientX,
        clientY: rect ? rect.top + clientY * scaleY : clientY,
      })
    );
  };

  target.addEventListener("mousemove", relayMouseMove);

  return () => {
    target.removeEventListener("mousemove", relayMouseMove);
    effect.destroy();
    host.remove();
  };
};
