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
  padding-right: 76px;
  right: ${({ $clockWidth, $hasAI, theme }) =>
    `calc(${$clockWidth}px + ${theme.sizes.clock.padding * 2}px + ${$hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"} + 376px)`};

  @media (max-width: 1000px) {
    right: ${({ $clockWidth, $hasAI, theme }) =>
      `calc(${$clockWidth}px + ${theme.sizes.clock.padding * 2}px + ${$hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"} + 168px)`};
  }

  @media (max-width: 560px) {
    right: ${({ $clockWidth, $hasAI, theme }) =>
      `calc(${$clockWidth}px + ${theme.sizes.clock.padding * 2}px + ${$hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"} + 36px)`};
    overflow-x: auto;
    padding-right: 0;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > li {
      flex: 0 0 40px;
      max-width: 40px;
    }

    > li > button {
      justify-content: center;
    }

    > li > button > img {
      height: 26px;
      object-fit: contain;
      width: 26px;
    }

    > li > button figure {
      justify-content: center;
      margin-left: 0;
      padding: 0;
      width: 100%;
    }

    > li > button figure figcaption {
      display: none;
    }

    > li > button figure picture {
      flex-basis: 26px;
      height: 26px;
      width: 26px;
    }
  }
`;

export default StyledTaskbarEntries;
