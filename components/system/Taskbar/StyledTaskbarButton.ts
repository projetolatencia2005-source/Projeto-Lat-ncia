import styled from "styled-components";
import Button from "styles/common/Button";

type StyledTaskbarButtonProps = {
  $active: boolean;
  $highlight?: boolean;
  $left?: number;
};

const StyledTaskbarButton = styled(Button)<StyledTaskbarButtonProps>`
  background-color: ${({ $active, $highlight, theme }) =>
    $active &&
    ($highlight ? theme.colors.taskbar.foreground : "hsla(0, 0%, 25%, 50%)")};
  display: flex;
  fill: ${({ theme }) => theme.colors.taskbar.button.color};
  height: 100%;
  left: ${({ $left }) => ($left ? `${$left}px` : 0)};
  place-content: center;
  place-items: center;
  position: absolute;

  && {
    width: ${({ theme }) => theme.sizes.taskbar.button.width}px;
  }

  svg {
    height: ${({ theme }) => theme.sizes.taskbar.button.iconSize};
  }

  &&[title="Abrir porta"] {
    background: #f7edd7;
    border: 2px solid #31302c;
    border-radius: 0;
    box-shadow: none;
    color: #31302c;
    gap: clamp(10px, 0.73vw, 14px);
    justify-content: flex-start;
    padding: 0 clamp(36px, 2vw, 40px) 0 clamp(10px, 0.84vw, 16px);
    width: clamp(142px, 13.333vw, 180px);

    .doors-door-mark {
      flex: 0 0 clamp(20px, 1.65vw, 26px);
      height: clamp(28px, 2.5vw, 34px);
      overflow: hidden;
      position: relative;
      width: clamp(20px, 1.65vw, 26px);
    }

    .doors-door-mark img {
      height: 100%;
      left: -270.37%;
      max-width: none;
      position: absolute;
      top: 0;
      width: 370.73%;
    }

    .doors-start-label {
      color: #31302c;
      font-family: "Pixelify Sans", monospace;
      font-size: clamp(14px, 1.1vw, 18px);
      white-space: nowrap;
    }
  }

  &&[title="Abrir porta"]:hover {
    background: #e7ddc1;
  }

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.taskbar.foreground : theme.colors.taskbar.hover};

    svg {
      fill: ${({ $highlight, theme }) =>
        $highlight ? theme.colors.highlight : undefined};
    }
  }

  &:active {
    background-color: hsl(0 0% 20% / 70%);

    svg {
      fill: ${({ $highlight }) =>
        $highlight ? "hsla(207, 100%, 60%, 80%)" : undefined};
    }
  }
`;

export default StyledTaskbarButton;
