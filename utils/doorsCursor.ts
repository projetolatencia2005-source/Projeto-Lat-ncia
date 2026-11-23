export const DOORS_CURSOR_STYLE_ID = "doors-custom-cursor-styles";

const DOORS_CURSOR_STYLES = `
  html, body, body * {
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default !important;
  }

  button:not(:disabled),
  a[href],
  [role="button"],
  [role="link"],
  [role="tab"],
  [role="menuitem"],
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
  [class*="cursor-pointer" i] {
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer !important;
  }
`;

export const installDoorsCursorStyles = (document: Document | null): void => {
  if (
    !document?.documentElement ||
    document.querySelector(`#${DOORS_CURSOR_STYLE_ID}`)
  ) {
    return;
  }

  const style = document.createElement("style");

  style.id = DOORS_CURSOR_STYLE_ID;
  style.textContent = DOORS_CURSOR_STYLES;
  (document.head || document.documentElement).append(style);
};
