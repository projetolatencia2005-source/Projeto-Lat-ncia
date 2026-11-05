export const DOORS_CURSOR_STYLE_ID = "doors-custom-cursor-styles";

const DOORS_CURSOR_STYLES = `
  html, body {
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  }

  button:not(:disabled),
  a[href],
  [role="button"],
  input[type="checkbox"],
  input[type="radio"],
  input[type="range"],
  label,
  select,
  summary {
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
  }

  input:not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"]),
  textarea,
  [contenteditable="true"] {
    cursor: text;
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
