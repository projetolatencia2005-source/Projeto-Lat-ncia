import { m as motion } from "motion/react";
import styled from "styled-components";
import StyledFileEntry from "components/system/Files/Views/List/StyledFileEntry";
import StyledFileManager from "components/system/Files/Views/List/StyledFileManager";
import TaskbarPanel from "components/system/Taskbar/TaskbarPanel";

type StyledStartMenuProps = {
  $showScrolling: boolean;
};

const StyledStartMenu = styled(motion.section)<StyledStartMenuProps>`
  ${({ theme }) =>
    TaskbarPanel(theme.sizes.startMenu.maxHeight, theme.sizes.startMenu.size)}

  background: #d7e4f7;
  border: 2px solid #302e2a;
  box-shadow: 4px 4px 0 rgb(36 33 28 / 35%);
  color: #302e2a;
  contain: strict;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.formats.systemFont};
  height: min(550px, calc(100vh - 50px));
  max-height: min(550px, calc(100vh - 50px));
  max-width: min(450px, calc(100vw - 10px));
  overflow: hidden;
  width: min(450px, calc(100vw - 10px));

  .doors-start-menu-header {
    align-items: center;
    background: #7d94b8;
    border-bottom: 2px solid #302e2a;
    color: #1d2532;
    display: flex;
    flex: 0 0 118px;
    gap: 18px;
    min-height: 0;
    padding: 16px 18px;

    strong {
      font-size: clamp(15px, 1.35vw, 22px);
      font-weight: 400;
    }
  }

  .doors-start-menu-avatar {
    border: 2px solid #302e2a;
    flex: 0 0 auto;
    height: 76px;
    image-rendering: pixelated;
    object-fit: cover;
    width: 76px;
  }

  .doors-start-menu-main {
    display: grid;
    flex: 1 1 auto;
    grid-template-columns: minmax(0, 56.5%) minmax(0, 1fr);
    min-height: 0;
  }

  .doors-start-menu-favorites {
    background: #f7edd7;
    min-height: 0;
    overflow-y: auto;
    padding: 0 20px;

    ol {
      list-style: none;
    }

    li {
      border-bottom: 2px solid #302e2a;
    }

    button {
      align-items: center;
      background: transparent;
      border: 0;
      box-sizing: border-box;
      color: #302e2a;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      font: inherit;
      font-size: clamp(12px, 1.08vw, 17px);
      gap: 14px;
      height: 50px;
      min-height: 50px;
      padding: 4px 0;
      text-align: left;
      width: 100%;

      img {
        flex: 0 0 35px;
        height: 35px;
        image-rendering: pixelated;
        object-fit: contain;
        width: 35px;
      }

      &:hover,
      &:focus-visible {
        background: #f1e6cb;
      }
    }

    li:nth-of-type(3) button img,
    li:nth-of-type(4) button img {
      flex-basis: 30px;
      height: 30px;
      width: 30px;
    }
  }

  .doors-start-menu-programs-pane {
    background: #d7e4f7;
    min-height: 0;
    min-width: 0;
    overflow: hidden;

    ${StyledFileManager} {
      background: #d7e4f7;
      flex: 1 1 auto;
      height: 100%;
      margin: 0;
      min-height: 0;
      overflow: auto;
      padding: 12px 8px;
      width: 100%;

      ${StyledFileEntry} {
        width: 100%;

        figure {
          color: #302e2a;

          figcaption {
            color: #31302c;
            font-size: 16px;
          }

          &:hover {
            background: #c2d6f0;
            border: 1px solid #302e2a;
          }
        }
      }
    }
    .doors-start-menu-expand-arrow {
      transform: translateX(3px);
    }
  }

  .doors-start-menu-footer {
    align-items: center;
    background: #7d94b8;
    border-top: 2px solid #302e2a;
    display: flex;
    flex: 0 0 70px;
    justify-content: space-between;
    min-height: 0;
    padding: 8px 14px 8px 18px;
  }

  .doors-start-menu-all-programs {
    align-items: center;
    background: transparent;
    border: 0;
    color: #302e2a;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    font: inherit;
    font-size: clamp(12px, 1.1vw, 17px);
    gap: 14px;
    justify-content: flex-start;
    padding: 0;
    text-align: left;

    &:hover span:first-child,
    &:focus-visible span:first-child {
      text-decoration: underline;
    }
  }

  .doors-start-menu-chevron {
      display: block;
      flex: 0 0 25px;
    height: 25px;
      object-fit: contain;
    width: 25px;
  }

  .doors-start-menu-power {
    align-items: center;
    aspect-ratio: 343 / 56;
    background: transparent;
    border: 0;
    box-shadow: none;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 auto;
    height: auto;
    line-height: 0;
    min-height: 0;
    padding: 0;
    width: min(220px, 52%);

    img {
      display: block;
      height: 100%;
      image-rendering: pixelated;
      width: 100%;
    }

    &:hover {
      background: transparent;
    }

    &:active {
      transform: translate(2px, 2px);
    }
  }

  @supports not selector(::-webkit-scrollbar) {
    .doors-start-menu-favorites {
      scrollbar-width: ${({ $showScrolling }) =>
        $showScrolling ? "thin" : "none"};
    }
  }

  @media (max-width: 480px) {
    .doors-start-menu-header {
      flex-basis: 92px;
      gap: 12px;
      padding: 12px;
    }

    .doors-start-menu-avatar {
      height: 62px;
      width: 62px;
    }

    .doors-start-menu-main {
      grid-template-columns: minmax(0, 58%) minmax(0, 1fr);
    }

    .doors-start-menu-favorites {
      padding: 0 10px;

      button {
        font-size: 11px;
        gap: 8px;
        min-height: 50px;

        img {
          flex-basis: 35px;
          height: 35px;
          width: 35px;
        }
      }
    }

    .doors-start-menu-footer {
      flex-basis: 62px;
      padding: 6px 8px;
    }

    .doors-start-menu-all-programs {
      font-size: 11px;
      gap: 7px;
      padding-left: 0;
    }

    .doors-start-menu-power {
      height: auto;
      min-height: 0;
      padding: 0;
      width: min(180px, 52%);

      img {
        height: 100%;
        width: 100%;
      }
    }
  }
`;

export default StyledStartMenu;
