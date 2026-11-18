import styled from "styled-components";

const StyledBrowser = styled.div`
  background: #dce5f0;
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  width: 100%;

  .browser-menu-bar {
    align-items: stretch;
    background: #f7edd7;
    border-bottom: 2px solid #31302c;
    border-top: 2px solid #31302c;
    box-sizing: border-box;
    display: flex;
    flex: 0 0 42px;
    gap: 2px;
    justify-content: flex-start;
    padding: 2px 6px 1px;
    position: relative;
    z-index: 4;

    &::before {
      background: #f7edd7;
      content: "";
      height: 2px;
      left: var(--active-tab-left, 5px);
      pointer-events: none;
      position: absolute;
      top: -2px;
      width: clamp(120px, 9.1vw, 175px);
      z-index: 5;
    }

    > .menu-item {
      background: transparent;
      border: 1px solid transparent;
      border-radius: 0;
      box-shadow: none;
      color: #202b3b;
      font-family: "Pixelify Sans", monospace;
      font-size: 14px;
      flex: 0 0 75px;
      height: 25px;
      justify-content: flex-start;
      padding: 1px 8px;
      text-align: left;
      transform: translateY(4px);

      &:hover,
      &[aria-expanded="true"] {
        background: #e9dfcb;
        border-color: #9b917d;
      }

      &:active {
        background: #d7cdb9;
      }
    }

    .menu-popover {
      background: #f7edd7;
      border: 2px solid #31302c;
      box-shadow: 3px 3px 0 #31302c;
      min-width: 190px;
      padding: 3px;
      position: absolute;
      top: calc(100% + 2px);

      button,
      .menu-note {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: 0;
        box-sizing: border-box;
        color: #202b3b;
        display: flex;
        font-family: "Pixelify Sans", monospace;
        font-size: 14px;
        justify-content: space-between;
        min-height: 29px;
        padding: 4px 8px;
        text-align: left;
        width: 100%;

        span {
          color: #68788e;
          margin-left: 15px;
        }

        &:hover {
          background: #d7e4f7;
        }
      }
    }
  }

  .browser-toolbar {
    align-items: center;
    background: #dce5f0;
    border-bottom: 2px solid #3b4b61;
    box-sizing: border-box;
    display: flex;
    flex: 0 0 42px;
    gap: 5px;
    min-width: 0;
    padding: 3px 5px;

    .navigation-buttons {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: 3px;

      > button {
        box-sizing: border-box;
        flex: 0 0 27px;
        height: 27px;
        min-width: 27px;
        padding: 0;
        width: 27px;
      }
    }

    button {
      align-items: center;
      background: #f7edd7;
      border: 2px solid #31302c;
      border-radius: 0;
      box-shadow: 2px 2px 0 #31302c;
      color: #26364b;
      display: flex;
      flex: 0 0 27px;
      height: 27px;
      justify-content: center;
      padding: 0;
      transition: background 0.15s ease-in-out;
      width: 27px;

      &.arrow-button {
        background: #f7edd7;
        border: 2px solid #31302c;
        box-shadow: 2px 2px 0 #31302c;

        img {
          height: 17px;
          width: 17px;
        }

        &:hover {
          background: #edf3fa;
          filter: none;
        }

        &:active {
          background: #c4d4e8;
          transform: translate(2px, 2px);
        }

        &:disabled {
          background: #d7e0eb;
          box-shadow: none;
          opacity: 0.5;
        }
      }

      svg {
        color: #26364b;
        fill: currentColor;
        height: 17px;
        width: 17px;
      }

      &:hover {
        background: #edf3fa;
      }

      &:active {
        background: #c4d4e8;
      }

      &:disabled {
        background: #d7e0eb;
        box-shadow: none;

        svg {
          color: #8595aa;
        }
      }
    }

    .address-label {
      align-items: center;
      display: flex;
      flex: 1 1 auto;
      gap: 8px;
      min-width: 0;

      > span {
        color: #202b3b;
        flex: 0 0 auto;
        font-family: "Pixelify Sans", monospace;
        font-size: 13px;
      }

      input {
        background: #fff;
        border: 2px solid #31302c;
        border-radius: 0;
        box-sizing: border-box;
        color: #38465a;
        flex: 1 1 auto;
        font-family: ${({ theme }) => theme.formats.systemFont};
        font-size: 13px;
        height: 31px;
        letter-spacing: 0;
        margin: 0;
        min-width: 0;
        padding: 0 9px;
        width: auto;

        &:focus {
          outline: 2px solid #839abc;
          outline-offset: 1px;
        }

        &::selection {
          background: #839abc;
          color: #202b3b;
        }
      }
    }
  }

  @media (max-width: 580px) {
    .browser-menu-bar {
      gap: 0;
      padding-left: 2px;
      padding-right: 2px;

      > .menu-item {
        flex-basis: 75px;
        font-size: 12px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    .browser-toolbar {
      gap: 3px;
      padding-left: 3px;
      padding-right: 3px;

      .navigation-buttons {
        gap: 2px;
      }

      .address-label {
        gap: 4px;

        > span {
          font-size: 11px;
        }
      }
    }
  }
  /* Mantém a atualização com a mesma presença dos botões de navegação. */
  .browser-toolbar .navigation-buttons > button {
    box-sizing: border-box;
    flex: 0 0 27px;
    height: 27px;
    min-width: 27px;
    width: 27px;
  }

  .browser-toolbar .navigation-buttons > button img {
    height: 20px;
    width: 20px;
  }

`;

export default StyledBrowser;

