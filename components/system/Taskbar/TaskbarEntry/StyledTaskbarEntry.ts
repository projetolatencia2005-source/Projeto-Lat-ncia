import { m as motion } from "motion/react";
import styled from "styled-components";
import Button from "styles/common/Button";

type StyledTaskbarEntryProps = {
  $foreground: boolean;
  $progress?: number;
};

const StyledTaskbarEntry = styled(motion.li)<StyledTaskbarEntryProps>`
  display: flex;
  min-width: 0;
  overflow: hidden;
  place-content: center;
  position: relative;
  background: ${({ $foreground }) => ($foreground ? "#f7edd7" : "transparent")};
  border: ${({ $foreground }) =>
    $foreground ? "2px solid #31302c" : "2px solid transparent"};
  width: ${({ theme }) => theme.sizes.taskbar.entry.maxWidth};
  flex: 0 1 160px;
  max-width: 160px;

  &::before {
    background-color: ${({ $foreground, $progress, theme }) =>
      $foreground
        ? $progress && $progress > 0 && $progress < 100
          ? theme.colors.taskbar.foregroundProgress
          : theme.colors.taskbar.foreground
        : ""};
    background-image: ${({ $progress, theme }) =>
      $progress && $progress > 0 && $progress < 100
        ? `linear-gradient(to right, ${theme.colors.progressBackground} 0% ${$progress}%, transparent ${$progress}% 100%)`
        : ""};
    border: ${({ $foreground }) => ($foreground ? "2px solid #31302c" : "0")};
    border-bottom: ${({ $foreground, $progress, theme }) =>
      $foreground
        ? "2px solid #31302c"
        : `
        ${theme.sizes.taskbar.entry.borderSize} solid ${
          $progress && $progress > 0 && $progress < 100
            ? theme.colors.progress
            : "#D7E4F7"
        }
      `};
    bottom: 0;
    content: "";
    height: ${({ $foreground }) => ($foreground ? "100%" : 0)};
    margin: ${({ $foreground }) => ($foreground ? "" : "0 4px")};
    position: absolute;
    transition-duration: 0.1s;
    transition-property: ${({ $foreground }) =>
      $foreground ? "all" : "width"};
    width: ${({ $foreground }) => ($foreground ? "100%" : `calc(100% - 8px)`)};
    z-index: -1;
  }

  &:hover {
    &::before {
      background-color: ${({ $foreground }) =>
        $foreground ? "#f7edd7" : "#D7E4F7"};
      height: 100%;
      margin: 0;
      width: 100%;
    }
  }

  &:active {
    &::before {
      background-color: ${({ $foreground, theme }) =>
        $foreground
          ? theme.colors.taskbar.activeForeground
          : theme.colors.taskbar.active};
    }
  }

  figure {
    align-items: center;
    display: flex;
    margin-bottom: ${({ theme }) => theme.sizes.taskbar.entry.borderSize};
    margin-left: 4px;
    padding: 4px;

    figcaption {
      color: #31302c;
      font-family: "Pixelify Sans", monospace;
      font-size: clamp(13px, 1vw, 15px);
      margin: 0 5px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    picture {
      flex: 0 0 26px;
      height: 26px;
      position: relative;
      top: 1px;
      width: 26px;

      img {
        height: 100%;
        image-rendering: pixelated;
        object-fit: contain;
        width: 100%;
      }
    }

    &.internet-expanded-taskbar-entry picture {
      flex-basis: 26px;
      height: 26px;
      width: 26px;

      img {
        height: 100%;
        image-rendering: pixelated;
        object-fit: contain;
        object-position: center;
        width: 100%;
      }
    }
  }

  > ${Button} {
    align-items: center;
    display: flex;

    figure {
      width: 100%;
    }
  }
`;

export default StyledTaskbarEntry;
