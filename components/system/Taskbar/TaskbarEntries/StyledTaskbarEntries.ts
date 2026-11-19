import styled from "styled-components";

type StyledTaskbarEntriesProps = {
  $clockWidth: number;
  $hasAI: boolean;
};

const StyledTaskbarEntries = styled.ol<StyledTaskbarEntriesProps>`
  column-gap: 1px;

  > li > button[draggable="true"] {
    cursor: grab;
  }

  > li > button[data-taskbar-dragging="true"] {
    opacity: 0.5;
  }

  > li > button[data-taskbar-drop-target="true"] {
    outline: 2px dashed #0872d1;
    outline-offset: -2px;
  }
  display: flex;
  height: 100%;
  margin: 0 3px;
  overflow: hidden;
  position: absolute;
  left: clamp(142px, 13.333vw, 180px);
  right: clamp(154px, 12vw, 184px) !important;
  padding-right: 76px;

  @media (max-width: 560px) {
    padding-right: 0;
  }
  right: ${({ $clockWidth, $hasAI, theme }) =>
    `calc(${$clockWidth}px + ${theme.sizes.clock.padding * 2}px + ${$hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"})`};
`;

export default StyledTaskbarEntries;
