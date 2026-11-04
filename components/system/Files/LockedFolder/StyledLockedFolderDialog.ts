import styled from "styled-components";

const StyledLockedFolderDialog = styled.div`
  align-items: center;
  background: rgb(0 0 0 / 48%);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 18px;
  position: fixed;
  z-index: 200000;

  .doors-locked-folder-window {
    background: #31302c;
    border: 2px solid #1d1c19;
    box-shadow: 5px 5px 0 #171613;
    color: #f7edd7;
    max-width: 880px;
    width: 100%;
  }

  .doors-locked-folder-titlebar {
    align-items: center;
    background: #f7edd7;
    color: #31302c;
    display: flex;
    font-size: 20px;
    gap: 9px;
    height: 46px;
    justify-content: space-between;
    padding: 0 7px 0 9px;
    touch-action: none;
    user-select: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  .doors-locked-folder-title {
    align-items: center;
    display: flex;
    gap: 8px;
    min-width: 0;
  }

  .doors-locked-folder-icon {
    height: 30px;
    object-fit: contain;
    width: 30px;
  }

  .doors-locked-folder-close {
    align-items: center;
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 2px 2px 0 #31302c;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    font: inherit;
    font-size: 17px;
    height: 26px;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 26px;

    &:hover {
      background: #e9dcc2;
    }

    &:focus-visible {
      outline: 2px dashed #7d94b8;
      outline-offset: 2px;
    }
  }

  .doors-locked-folder-form {
    padding: 28px 32px 24px;
  }

  .doors-locked-folder-prompt {
    font-size: clamp(13px, 2.1vw, 21px);
    line-height: 1.55;
    margin: 0 0 21px;
    text-align: center;
  }

  .doors-locked-folder-words {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .doors-locked-folder-input {
    background: #f7edd7;
    border: 2px solid #171613;
    box-shadow: 3px 3px 0 #171613;
    color: #31302c;
    cursor: text;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 14px;
    height: 44px;
    min-width: 0;
    padding: 0 10px;
    text-align: center;
    user-select: text;
    -webkit-user-select: text;
    width: 100%;

    &:focus,
    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: #cdbf9f;
      opacity: 1;
    }

  }

  .doors-locked-folder-error {
    color: #ffd1c9;
    font-size: 12px;
    margin: 16px 0 0;
    min-height: 18px;
    text-align: center;
  }

  .doors-locked-folder-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .doors-locked-folder-submit {
    background: #f7edd7;
    border: 2px solid #171613;
    box-shadow: 3px 3px 0 #171613;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: 12px;
    min-height: 34px;
    padding: 5px 12px;

    &:hover:not(:disabled) {
      background: #e9dcc2;
    }

    &:disabled {
      color: #938b7b;
      opacity: 0.7;
    }

    &:focus-visible {
      outline: 2px dashed #d7e4f7;
      outline-offset: 3px;
    }
  }

  @media (max-width: 680px) {
    .doors-locked-folder-titlebar {
      font-size: 16px;
    }

    .doors-locked-folder-form {
      padding: 22px 18px 18px;
    }

    .doors-locked-folder-words {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export default StyledLockedFolderDialog;
