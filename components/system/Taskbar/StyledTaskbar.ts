import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const TASKBAR_Z_INDEX = 100000;

const StyledTaskbar = styled.nav`
  &, * {
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

  background: linear-gradient(
    90deg,
    #7d94b8 0 calc(100% - 275px),
    #d7e4f7 calc(100% - 275px) 100%
  );
  border-top: 2px solid #31302c;
  bottom: 0;
  contain: size layout;
  height: ${TASKBAR_HEIGHT}px;
  left: 0;
  position: absolute;
  right: 0;
  width: 100vw;
  z-index: ${TASKBAR_Z_INDEX};

  &::after {
    background: #31302c;
    border-radius: 0;
    content: "";
    display: block;
    height: 100%;
    left: calc(100% - 275px);
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2px;
    z-index: 1;
  }
`;

export default StyledTaskbar;
