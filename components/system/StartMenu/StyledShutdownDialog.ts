import styled from "styled-components";

const StyledShutdownDialog = styled.div`
  align-items: center;
  background: rgb(0 0 0 / 18%);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 12px;
  position: fixed;
  z-index: 200001;

  .doors-shutdown-window {
    background: #f7edd7;
    border: 2px solid #302e2a;
    box-shadow: 5px 5px 0 #171613;
    color: #302e2a;
    max-width: calc(100vw - 24px);
    transition: width 120ms steps(2), height 120ms steps(2);
    width: min(642px, calc(100vw - 24px));
  }

  .doors-shutdown-window.is-maximized {
    width: min(860px, calc(100vw - 24px));
  }

  .doors-shutdown-titlebar {
    align-items: center;
    background: #ff3333;
    border-bottom: 2px solid #31302c;
    color: #fff;
    display: flex;
    font-size: 19px;
    height: 48px;
    justify-content: space-between;
    padding: 0 8px 0 14px;
    touch-action: none;
    user-select: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    strong {
      font-weight: 400;
    }
  }

  .doors-shutdown-window-actions {
    display: flex;
    gap: 3px;

    button {
      align-items: center;
      background: transparent;
      border: 0;
      box-shadow: none;
      color: #302e2a;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      height: 27px;
      justify-content: center;
      line-height: 1;
      padding: 0;
      width: 27px;

      img {
        display: block;
        height: 100%;
        image-rendering: pixelated;
        width: 100%;
      }

      &:hover {
        background: transparent;
      }
    }
  }

  .doors-shutdown-content {
    padding: 23px 30px 27px;

    h2 {
      color: #ff3333;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;
      margin: 0 0 8px;
      text-align: center;
    }

    p {
      color: #302e2a;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      text-align: center;
    }
  }

  .doors-shutdown-actions {
    display: grid;
    gap: 9px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 17px auto 0;
    max-width: 546px;

    button {
      background: #f7edd7;
      border: 2px solid #302e2a;
      box-shadow: 3px 3px 0 #302e2a;
      color: #302e2a;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      font: inherit;
      font-size: 16px;
      line-height: 1.25;
      min-height: 44px;
      padding: 6px 8px;

      &:hover {
        background: #f1e6cb;
      }

      &:active {
        box-shadow: 1px 1px 0 #302e2a;
        transform: translate(2px, 2px);
      }

      &:focus-visible {
        outline: 2px solid #7d94b8;
        outline-offset: 2px;
      }
    }

    .doors-shutdown-confirm {
      color: #b6a883;
    }
  }

  .doors-shutdown-window.is-minimized .doors-shutdown-titlebar {
    border-bottom: 0;
  }

  @media (max-width: 520px) {
    .doors-shutdown-content {
      padding: 18px 12px;
    }

    .doors-shutdown-actions {
      grid-template-columns: 1fr;
    }
  }
`;

export default StyledShutdownDialog;
