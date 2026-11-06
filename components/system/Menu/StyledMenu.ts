import { m as motion } from "motion/react";
import styled from "styled-components";

type StyledMenuProps = {
  $isFileExplorerMenu: boolean;
  $isSubMenu: boolean;
  $x: number;
  $y: number;
};

const StyledMenu = styled(motion.nav).attrs<StyledMenuProps>(({ $x, $y }) => ({
  style: {
    transform: `translate(${$x}px, ${$y}px)`,
  },
}))<StyledMenuProps>`
  background-color: #f7edd7;
  border: 2px solid #31302c;
  box-shadow: ${({ theme }) => theme.colors.window.shadow};
  color: #31302c;
  contain: layout;
  font-size: 12px;
  max-height: fit-content;
  max-width: fit-content;
  padding: 4px 2px;
  pointer-events: none;
  position: fixed;
  width: max-content;
  z-index: ${({ $isSubMenu }) => $isSubMenu && 1};

  ol {
    pointer-events: all;

    li.disabled {
      color: rgb(110 110 110);
      pointer-events: none;

      > div {
        color: rgb(110 110 110);
      }
    }

    hr {
      background-color: rgb(128 128 128);
      height: 1px;
      margin: 3px 8px;
    }

    li > div {
      color: #31302c;
      display: flex;
      padding: 3px 0;

      /* While using the keyboard, a resting pointer selects nothing */
      :root:not([data-keyboard]) &:hover,
      &.active,
      :root[data-keyboard] &:focus {
        background-color: #e8dcc2;

        /* Like Windows in high contrast, using its own selection colors */
        @media (forced-colors: active) {
          background-color: highlight;
          color: highlighttext;
          forced-color-adjust: none;

          svg {
            fill: highlighttext;
          }
        }
      }

      figcaption {
        display: flex;
        height: 16px;
        line-height: 16px;
        margin-left: 32px;
        margin-right: 64px;
        place-items: center;
        position: relative;
        top: -1px;
        white-space: nowrap;
        width: max-content;

        &.primary {
          font-weight: 700;
        }
      }

      picture {
        margin: 0 -24px 0 8px;
      }

      span {
        margin: -1px -24px 0 8px;
      }

      svg {
        fill: #31302c;
        height: 13px;
        margin-top: 1px;
        position: absolute;
        width: 13px;

        &.left {
          left: 8px;
        }

        &.right {
          right: 8px;
        }
      }

      img.right {
        height: 13px;
        margin-top: 1px;
        position: absolute;
        right: 8px;
        width: 13px;
      }

      .icon > svg {
        height: 15px;
        left: 10px;
        width: 15px;
      }
    }
  }
`;

export default StyledMenu;