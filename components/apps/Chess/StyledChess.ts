import styled from "styled-components";
import FocusRing from "styles/common/FocusRing";
import VisuallyHidden from "styles/common/VisuallyHidden";

const TOOLBAR_BG = "#f7edd7";
const STATUS_BG = "#dbd0ba";
const TEXT_COLOR = "#31302c";
const SUBTLE_COLOR = "#53657b";
const ACCENT_COLOR = "#7d94b8";
const ACCENT_ACTIVE = "#91a7c4";
const CONTROL_BG = "#d7e4f7";
const CONTROL_BORDER = "#31302c";
const DISABLED_BG = "#ebe6da";
const SELECTION_BLUE = "#2778c5";

const StyledChess = styled.div`
  background-color: #d7e4f7;
  color: ${TEXT_COLOR};
  cursor:
    url("/System/Doors/cursors/mouse.svg") 0 0,
    default;
  display: flex;
  flex-direction: column;
  font-family: "Pixelify Sans", ${({ theme }) => theme.formats.systemFont};
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;

  .loading-overlay {
    inset: 0;
    position: absolute;
    z-index: 10;
  }

  nav.toolbar {
    align-items: center;
    background-color: ${TOOLBAR_BG};
    border-bottom: 2px solid ${CONTROL_BORDER};
    box-shadow: inset 0 2px 0 rgb(255 255 255 / 55%);
    display: grid;
    flex: 0 0 auto;
    gap: 8px 10px;
    grid-template-columns: auto 1fr auto 1fr;
    padding: 8px 10px;

    label {
      color: ${SUBTLE_COLOR};
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    select {
      appearance: none;
      background-color: ${CONTROL_BG};
      background-image:
        linear-gradient(45deg, transparent 50%, ${TEXT_COLOR} 50%),
        linear-gradient(135deg, ${TEXT_COLOR} 50%, transparent 50%);
      background-position:
        calc(100% - 11px) 50%,
        calc(100% - 6px) 50%;
      background-repeat: no-repeat;
      background-size:
        5px 5px,
        5px 5px;
      border: 2px solid ${CONTROL_BORDER};
      border-radius: 0;
      box-shadow: 2px 2px 0 ${CONTROL_BORDER};
      color: ${TEXT_COLOR};
      font-family: inherit;
      font-size: 13px;
      min-width: 0;
      padding: 5px 22px 5px 7px;
      text-overflow: ellipsis;
      width: 100%;

      &:disabled {
        background-color: ${DISABLED_BG};
        color: ${SUBTLE_COLOR};
      }
    }

    .actions {
      display: flex;
      gap: 6px;
      grid-column: 1 / -1;
    }
  }

  .action-btn {
    background-color: ${ACCENT_COLOR};
    border: 2px solid ${CONTROL_BORDER};
    border-radius: 0;
    box-shadow: 3px 3px 0 ${CONTROL_BORDER};
    color: ${TEXT_COLOR};
    cursor:
      url("/System/Doors/cursors/hand.svg") 0 0,
      pointer;
    flex: 1;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    padding: 7px 10px;
  }

  .action-btn.secondary {
    background-color: ${CONTROL_BG};
    color: ${TEXT_COLOR};
  }

  .action-btn:disabled {
    cursor:
      url("/System/Doors/cursors/mouse.svg") 0 0,
      default;
    opacity: 55%;
  }

  .action-btn:hover:not(:disabled) {
    background-color: ${ACCENT_ACTIVE};
  }

  .action-btn.secondary:hover:not(:disabled) {
    background-color: #c4d4e8;
  }

  .board-wrap {
    align-items: center;
    background: #d7e4f7;
    container-type: size;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
    padding: 12px;
  }

  .board-frame {
    aspect-ratio: 1 / 1;
    background: #f7edd7;
    border: 3px solid ${CONTROL_BORDER};
    box-shadow: 4px 4px 0 ${CONTROL_BORDER};
    box-sizing: border-box;
    height: min(100cqh, 100cqw);
    position: relative;
    width: min(100cqh, 100cqw);
  }

  .board {
    cursor:
      url("/System/Doors/cursors/hand.svg") 0 0,
      pointer;
    height: 100%;
    width: 100%;
  }

  .board .piece-349f8 img {
    image-rendering: pixelated;
  }

  .board .piece-349f8 img[src*="/wP.svg"],
  .board .piece-349f8 img[src*="/bP.svg"],
  .board .piece-349f8 img[src*="/wR.svg"],
  .board .piece-349f8 img[src*="/bR.svg"],
  .board .piece-349f8 img[src*="/wN.svg"],
  .board .piece-349f8 img[src*="/bN.svg"],
  .board .piece-349f8 img[src*="/wB.svg"],
  .board .piece-349f8 img[src*="/bB.svg"],
  .board .piece-349f8 img[src*="/wQ.svg"],
  .board .piece-349f8 img[src*="/bQ.svg"],
  .board .piece-349f8 img[src*="/wK.svg"],
  .board .piece-349f8 img[src*="/bK.svg"] {
    left: 50%;
    max-width: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .board .piece-349f8 img[src*="/wP.svg"],
  .board .piece-349f8 img[src*="/bP.svg"] {
    height: 35px;
    width: 35px;
  }

  .board .piece-349f8 img[src*="/wR.svg"],
  .board .piece-349f8 img[src*="/bR.svg"],
  .board .piece-349f8 img[src*="/wN.svg"],
  .board .piece-349f8 img[src*="/bN.svg"],
  .board .piece-349f8 img[src*="/wB.svg"],
  .board .piece-349f8 img[src*="/bB.svg"] {
    height: 40px;
    width: 40px;
  }

  .board .piece-349f8 img[src*="/wQ.svg"],
  .board .piece-349f8 img[src*="/bQ.svg"] {
    height: 44px;
    width: 44px;
  }

  .board .piece-349f8 img[src*="/wK.svg"],
  .board .piece-349f8 img[src*="/bK.svg"] {
    height: 42px;
    width: 42px;
  }

  .board .square-4b72b.white-3b784 {
    background-color: #f7edd7;
  }

  .board .square-4b72b.black-b7cb6 {
    background-color: #7d94b8;
  }

  .board .circle-a0266 {
    border-radius: 0;
  }

  /* chessboard2's own border duplicates ours and shifts pieces inward by 2px,
     misaligning our overlay coords/highlight. Drop it. */
  .board .board-container-41a68 {
    border: 0;
  }

  /* Squares are siblings of items-container in chessboard2's DOM, but come
     LATER in source order. With position: relative on .square-4b72b (needed to
     anchor coord pseudo-elements) the squares paint after items-container,
     and their opaque backgrounds hide pieces. Pull items-container above. */
  .board .items-container-c9182 {
    z-index: 1;
  }

  .board .square-4b72b {
    position: relative;
  }

  :root[data-keyboard] & .board:focus .square-4b72b.square-cursor {
    ${FocusRing};
  }

  .cursor-announcement,
  .engine-move {
    ${VisuallyHidden};
  }

  /* Blue selection overlay on the actual chessboard2 square so
     positioning matches by construction. background-image stacks over the
     existing background-color, letting the square's color show through. */
  .board .square-4b72b.square-selected {
    background-image: linear-gradient(${SELECTION_BLUE}69, ${SELECTION_BLUE}69);
  }

  /* Edge-only coord labels in the lichess style. Only the corner square
     gets both. content is set per-square below; positioning + color cascade
     from these base rules. */
  .board .square-4b72b::after,
  .board .square-4b72b::before {
    font-size: clamp(8px, 1.6cqmin, 11px);
    font-weight: 700;
    line-height: 1;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .board .square-4b72b::after {
    bottom: 1px;
    left: 2px;
  }

  .board .square-4b72b::before {
    right: 2px;
    top: 1px;
  }

  .board .square-4b72b.white-3b784::after,
  .board .square-4b72b.white-3b784::before {
    color: #31302c;
  }

  .board .square-4b72b.black-b7cb6::after,
  .board .square-4b72b.black-b7cb6::before {
    color: #f7edd7;
  }

  ${["a", "b", "c", "d", "e", "f", "g", "h"]
    .map(
      (file) => `
    .board .orientation-white-4de03 [data-square-coord="${file}1"]::after,
    .board .orientation-black-a8276 [data-square-coord="${file}8"]::after {
      content: "${file}";
    }`
    )
    .join("")}

  ${[1, 2, 3, 4, 5, 6, 7, 8]
    .map(
      (rank) => `
    .board .orientation-white-4de03 [data-square-coord="h${rank}"]::before,
    .board .orientation-black-a8276 [data-square-coord="a${rank}"]::before {
      content: "${rank}";
    }`
    )
    .join("")}

  .pgn-nav {
    align-items: center;
    background-color: ${TOOLBAR_BG};
    border-top: 2px solid ${CONTROL_BORDER};
    box-shadow: inset 0 2px 0 rgb(255 255 255 / 45%);
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
    justify-content: center;
    padding: 6px 10px;

    .pgn-counter {
      color: ${SUBTLE_COLOR};
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      min-width: 60px;
      text-align: center;
    }
  }

  .pgn-btn {
    background-color: ${CONTROL_BG};
    border: 2px solid ${CONTROL_BORDER};
    border-radius: 0;
    box-shadow: 2px 2px 0 ${CONTROL_BORDER};
    color: ${TEXT_COLOR};
    cursor:
      url("/System/Doors/cursors/hand.svg") 0 0,
      pointer;
    font-family: inherit;
    font-size: 14px;
    line-height: 1;
    min-width: 36px;
    padding: 4px 8px;
  }

  .pgn-btn:disabled {
    cursor:
      url("/System/Doors/cursors/mouse.svg") 0 0,
      default;
    opacity: 55%;
  }

  .pgn-btn:hover:not(:disabled) {
    background-color: ${ACCENT_ACTIVE};
  }

  .status {
    background-color: ${STATUS_BG};
    border-top: 2px solid ${CONTROL_BORDER};
    color: ${TEXT_COLOR};
    flex: 0 0 auto;
    font-size: 12px;
    padding: 8px 10px;
    text-align: center;

    &.thinking {
      color: ${TEXT_COLOR};
      font-style: italic;
    }

    &.over {
      background-color: #9acb3c;
      color: ${TEXT_COLOR};
      font-weight: 600;
    }
  }
`;

export default StyledChess;
