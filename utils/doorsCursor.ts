export const DOORS_CURSOR_STYLE_ID = "doors-custom-cursor-styles";

const DOORS_HAND_CURSOR_SELECTOR = `
  button:not(:disabled),
  a[href],
  [role="button"],
  [role="link"],
  [role="tab"],
  [role="menuitem"],
  [aria-haspopup],
  input[type="checkbox"],
  input[type="radio"],
  input[type="button"],
  input[type="submit"],
  input[type="reset"],
  input[type="range"],
  label,
  select,
  summary,
  [draggable="true"],
  [onclick],
  [class*="button" i],
  [class*="btn" i],
  [class*="link" i],
  [class*="handle" i],
  [class*="cursor-pointer" i]
`;

const DOORS_CURSOR_STYLES = `
  :root:not(#doors-cursor-never-match),
  :root:not(#doors-cursor-never-match) * {
    cursor: none !important;
  }

  ${DOORS_HAND_CURSOR_SELECTOR} {
    cursor: none !important;
  }
`;

const installedDocuments = new WeakSet<Document>();

const installDoorsCursorSprite = (document: Document): void => {
  const sprite = document.createElement("img");

  sprite.alt = "";
  sprite.setAttribute("aria-hidden", "true");
  sprite.draggable = false;
  sprite.style.cssText =
    "position:fixed;left:0;top:0;width:20px;height:32px;pointer-events:none;z-index:2147483647;visibility:hidden;transform:translate3d(-100px,-100px,0);image-rendering:auto;object-fit:contain;";

  const updateSprite = (event: Event): void => {
    const pointerEvent = event as PointerEvent;

    if (pointerEvent.pointerType === "touch") {
      return;
    }

    const target = pointerEvent.target;

    if (target instanceof document.defaultView!.HTMLIFrameElement) {
      sprite.style.visibility = "hidden";
      return;
    }

    const usesHand =
      target instanceof document.defaultView!.Element &&
      target.closest(DOORS_HAND_CURSOR_SELECTOR) !== null;
    const cursorPath = usesHand
      ? "/System/Doors/cursors/hand.svg"
      : "/System/Doors/cursors/mouse.svg";
    const size = usesHand ? 28 : 20;

    if (sprite.getAttribute("src") !== cursorPath) {
      sprite.src = cursorPath;
      sprite.style.width = `${size}px`;
    }

    sprite.style.transform = `translate3d(${pointerEvent.clientX}px, ${pointerEvent.clientY}px, 0)`;
    sprite.style.visibility = "visible";
  };

  const hideSprite = (): void => {
    sprite.style.visibility = "hidden";
  };

  sprite.src = "/System/Doors/cursors/mouse.svg";
  // TinyMCE replaces the editable body's contents when it loads a document.
  // Keep the cursor overlay on <html> so opening or editing a Post-it cannot
  // remove it along with the editor content.
  document.documentElement.append(sprite);
  document.addEventListener("pointermove", updateSprite, true);
  document.addEventListener("pointerover", updateSprite, true);
  document.documentElement.addEventListener("pointerleave", hideSprite, true);
  document.defaultView?.addEventListener("blur", hideSprite);
};

export const installDoorsCursorStyles = (document: Document | null): void => {
  if (!document?.documentElement || installedDocuments.has(document)) {
    return;
  }

  installedDocuments.add(document);

  const style = document.createElement("style");

  style.id = DOORS_CURSOR_STYLE_ID;
  style.textContent = DOORS_CURSOR_STYLES;
  (document.head || document.documentElement).append(style);
  installDoorsCursorSprite(document);
};

