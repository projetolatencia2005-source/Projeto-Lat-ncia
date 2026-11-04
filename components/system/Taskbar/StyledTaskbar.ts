import styled from "styled-components";
import { TASKBAR_HEIGHT } from "utils/constants";

const TASKBAR_Z_INDEX = 100000;

const StyledTaskbar = styled.nav`
  background: linear-gradient(
    90deg,
    #7d94b8 0 calc(100% - 250px),
    #d7e4f7 calc(100% - 250px) 100%
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
    content: "";
    display: block;
    height: 100%;
    left: calc(100% - 250px);
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2px;
    z-index: 1;
  }
`;

export default StyledTaskbar;
