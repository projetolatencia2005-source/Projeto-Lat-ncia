import { type HandleStyles } from "react-rnd";

export const RESIZING_DISABLED = {
  bottom: false,
  bottomLeft: false,
  bottomRight: false,
  left: false,
  right: false,
  top: false,
  topLeft: false,
  topRight: false,
};

export const RESIZING_ENABLED = {
  bottom: true,
  bottomLeft: true,
  bottomRight: true,
  left: true,
  right: true,
  top: true,
  topLeft: true,
  topRight: true,
};

export const MIN_WINDOW_HEIGHT = 30;
export const MIN_WINDOW_WIDTH = 166;

const rndDefaults = {
  cancel: ".cancel",
  dragHandleClassName: "handle",
  enableUserSelectHack: false,
  minHeight: `${MIN_WINDOW_HEIGHT}px`,
  minWidth: `${MIN_WINDOW_WIDTH}px`,
  resizeHandleStyles: {
    bottom: {
      bottom: "-3px",
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "6px",
    },
    bottomLeft: {
      bottom: "-3px",
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "12px",
      left: "-3px",
      width: "12px",
    },
    bottomRight: {
      bottom: "-3px",
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "12px",
      right: "-3px",
      width: "12px",
    },
    left: {
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      left: "-3px",
      width: "6px",
    },
    right: {
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      right: "-3px",
      width: "6px",
    },
    top: {
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "6px",
      top: "-3px",
    },
    topLeft: {
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "12px",
      left: "-3px",
      top: "-3px",
      width: "12px",
    },
    topRight: {
      cursor: 'url("/System/Doors/cursors/hand.svg") 0 0, pointer',
      height: "12px",
      right: "-3px",
      top: "-3px",
      width: "12px",
    },
  } as HandleStyles,
};

export default rndDefaults;
