import styled from "styled-components";

type StyledClockProps = {
  $hasAI: boolean;
  $width: number;
};

const StyledClock = styled.button.attrs({
  type: "button",
})<StyledClockProps>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  height: 100%;
  line-height: 22px;
  max-width: ${({ $width, theme }) =>
    `calc(${$width}px + ${theme.sizes.clock.padding * 2}px)`};
  min-width: ${({ $width, theme }) =>
    `calc(${$width}px + ${theme.sizes.clock.padding * 2}px)`};
  padding: ${({ theme }) => `0 ${theme.sizes.clock.padding}px`};
  place-content: center;
  position: absolute;
  right: ${({ $hasAI, theme }) =>
    `calc(${
      $hasAI ? theme.sizes.taskbar.ai.buttonWidth : "0px"
    } + 10px)`};
  white-space: nowrap;
  text-align: right;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;

  canvas {
    height: 22px;
  }

  .doors-clock-date {
    color: #302e2a;
    font-family: "Pixelify Sans", monospace;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }

  min-width: 118px;
  max-width: 118px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.taskbar.foreground};
  }
`;

export default StyledClock;
