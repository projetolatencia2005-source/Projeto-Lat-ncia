import styled from "styled-components";

type StyledTaskbarEntriesProps = {
  $clockWidth: number;
  $hasAI: boolean;
};

const StyledTaskbarEntries = styled.ol<StyledTaskbarEntriesProps>`
  column-gap: 1px;
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
