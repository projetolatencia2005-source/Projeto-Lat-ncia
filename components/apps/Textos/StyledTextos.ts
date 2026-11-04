import styled from "styled-components";

const StyledTextos = styled.div`
  background: #d7e4f7;
  color: #31302c;
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.formats.systemFont};
  height: 100%;
  min-height: 0;
  overflow: hidden;
  position: relative;
  width: 100%;

  .textos-ribbon {
    align-items: stretch;
    background: #d7e4f7;
    border-bottom: 2px solid #31302c;
    display: flex;
    flex: 0 0 clamp(42px, 3.91vw, 75px);
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    white-space: nowrap;
  }

  .textos-ribbon-group {
    align-items: center;
    border-right: 2px solid #31302c;
    display: flex;
    flex: 0 0 auto;
    gap: 1px;
    padding: 3px 6px;
  }

  .textos-ribbon-button {
    align-items: center;
    background: #d7e4f7;
    border: 2px solid transparent;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: inline-flex;
    font: inherit;
    font-size: clamp(12px, 1.15vw, 17px);
    gap: 5px;
    justify-content: center;
    min-height: 34px;
    padding: 2px 5px;

    &:hover,
    &:focus-visible {
      background: #f7edd7;
      border-color: #31302c;
      outline: none;
    }

    &:active {
      box-shadow: inset 2px 2px 0 rgb(49 48 44 / 45%);
    }

    &:disabled {
      cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
      opacity: 0.55;
    }

    img {
      display: block;
      flex: 0 0 auto;
      height: 25px;
      image-rendering: pixelated;
      object-fit: contain;
      width: 25px;
    }
  }

  .textos-history-button {
    min-width: 76px;
  }

  .textos-home-button {
    min-width: 82px;
  }

  .textos-home-icon {
    flex: 0 0 22px;
    height: 22px;
    width: 22px;
  }

  .textos-arrow-button {
    display: block;
    flex: 0 0 25px;
    height: 25px;
    object-fit: contain;
    width: 25px;
  }

  .textos-ribbon-button.textos-icon-button {
    min-width: 34px;
    padding: 2px 3px;
  }

  .textos-library-button {
    min-width: 114px;
  }

  .textos-library-button img {
    height: 24px;
    width: 28px;
  }

  .textos-font-label {
    font-size: clamp(12px, 1.15vw, 17px);
    padding: 0 4px;
  }

  .textos-font-select,
  .textos-size-select {
    appearance: none;
    background: #fff;
    border: 2px solid #31302c;
    border-radius: 0;
    color: #31302c;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: clamp(12px, 1.1vw, 17px);
    height: 34px;
    padding: 2px 8px;
  }

  .textos-font-select {
    min-width: clamp(105px, 15vw, 160px);
  }

  .textos-size-select {
    min-width: 64px;
  }

  .textos-paragraph-select {
    appearance: none;
    background: #fff;
    border: 2px solid #31302c;
    border-radius: 0;
    color: #31302c;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: clamp(12px, 1.1vw, 17px);
    height: 34px;
    margin-left: 3px;
    min-width: 82px;
    padding: 2px 6px;
  }

  .textos-character-button {
    font-family: "Pixelify Sans", sans-serif;
    font-size: 16px;
    min-width: 24px;
    padding: 2px 4px;
  }

  .textos-character-button.is-bold {
    font-weight: 700;
  }

  .textos-character-button.is-italic {
    font-style: italic;
  }

  .textos-character-button.is-underline {
    text-decoration: underline;
  }

  .textos-character-button.is-strikethrough {
    text-decoration: line-through;
  }

  .textos-color-button {
    flex: 0 0 34px;
    min-width: 34px;
    position: relative;
  }

  .textos-color-preview {
    border-bottom: 4px solid;
    font-size: 19px;
    font-weight: 700;
    line-height: 18px;
  }

  .textos-highlight-button {
    flex-basis: 28px;
    min-width: 28px;
  }

  .textos-highlight-preview {
    border: 2px solid #31302c;
    height: 9px;
    width: 17px;
  }

  .textos-color-palette {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 3px 3px 0 #31302c;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 7px;
    position: absolute;
    width: 218px;
    z-index: 30;
  }

  .textos-color-palette-heading {
    align-items: center;
    display: flex;
    font-size: 15px;
    justify-content: space-between;
  }

  .textos-color-palette-close {
    background: #f7edd7;
    border: 2px solid #31302c;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: 15px;
    height: 22px;
    line-height: 14px;
    padding: 0;
    width: 22px;

    &:hover,
    &:focus-visible {
      background: #d7e4f7;
      outline: 2px solid #2778c5;
      outline-offset: 1px;
    }
  }

  .textos-color-swatches {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
  }

  .textos-color-swatch {
    border: 2px solid #31302c;
    box-shadow: inset 1px 1px 0 rgb(255 255 255 / 45%);
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    height: 24px;
    padding: 0;
    width: 100%;

    &:hover,
    &:focus-visible,
    &[aria-pressed="true"] {
      outline: 2px solid #2778c5;
      outline-offset: 1px;
    }
  }

  .textos-alignment-button {
    height: 30px;
    min-width: 27px;
    padding: 4px 3px;

    &.is-active {
      background: #f7edd7;
      border-color: #31302c;
      box-shadow: inset 2px 2px 0 rgb(49 48 44 / 35%);
    }
  }

  .textos-alignment-mark {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 22px;

    i {
      background: #31302c;
      display: block;
      height: 2px;
      width: 100%;
    }
  }

  .textos-alignment-mark.is-center i:nth-child(2) {
    margin: 0 auto;
    width: 70%;
  }

  .textos-alignment-mark.is-left i:nth-child(2) {
    margin-right: auto;
    width: 70%;
  }

  .textos-alignment-mark.is-left i:nth-child(3) {
    margin-right: auto;
    width: 85%;
  }

  .textos-alignment-mark.is-right i:nth-child(2) {
    margin-left: auto;
    width: 70%;
  }

  .textos-workspace {
    background: #d7e4f7;
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
  }

  .textos-home {
    background: #d7e4f7;
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
  }

  .textos-home-sidebar {
    background: #7d94b8;
    border-right: 2px solid #31302c;
    display: flex;
    flex: 0 0 172px;
    flex-direction: column;
    min-height: 0;
    padding: 0 14px;

    button {
      align-items: center;
      background: transparent;
      border: 0;
      border-bottom: 2px solid #31302c;
      color: #31302c;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      display: flex;
      font: inherit;
      font-size: clamp(12px, 1.1vw, 16px);
      gap: 9px;
      min-height: 42px;
      padding: 4px 5px;
      text-align: left;

      &:hover,
      &:focus-visible {
        background: #f7edd7;
        outline: none;
      }

      img {
        height: 23px;
        image-rendering: pixelated;
        object-fit: contain;
        width: 27px;
      }
    }
  }

  .textos-models-area {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: 26px clamp(20px, 4vw, 48px);
  }

  .textos-models-heading {
    align-items: center;
    display: flex;
    font-size: clamp(15px, 1.35vw, 19px);
    font-weight: 400;
    gap: 8px;
    margin: 0 0 20px;
  }

  .textos-models-next {
    display: block;
    flex: 0 0 22px;
    height: 22px;
    object-fit: contain;
    width: 22px;
  }

  .textos-template-list {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: 24px 28px;
  }

  .textos-template-card {
    align-items: center;
    background: transparent;
    border: 2px solid transparent;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    flex: 0 0 120px;
    flex-direction: column;
    font: inherit;
    gap: 7px;
    padding: 4px;
    text-align: center;

    &:hover,
    &:focus-visible {
      background: #f7edd7;
      border-color: #31302c;
      outline: none;
    }
  }

  .textos-template-card.is-school-test {
    border-color: #f7edd7;
  }

  .textos-template-preview {
    background: #fff;
    border: 2px solid #31302c;
    display: block;
    height: 124px;
    padding: 7px;
    width: 104px;
  }

  .textos-template-preview-lines {
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 6px,
      #31302c 6px,
      #31302c 8px
    );
    display: block;
    height: 100px;
    width: 100%;
  }

  .textos-template-preview.is-blank {
    background: #fff;
  }

  .textos-template-name {
    font-size: clamp(11px, 1vw, 14px);
    line-height: 1.25;
    max-width: 116px;
  }

  .textos-ruler {
    background: #d7e4f7;
    border-right: 2px solid #31302c;
    flex: 0 0 22px;
    overflow: hidden;
  }

  .textos-ruler img {
    display: block;
    height: auto;
    max-width: none;
    width: auto;
  }

  .textos-page-scroll {
    align-items: flex-start;
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    min-height: 0;
    overflow: auto;
    padding: 0 18px 30px;
  }

  .textos-paper {
    background: #fff;
    border: 2px solid #31302c;
    flex: 0 0 min(794px, calc(100% - 36px));
    height: 1120px;
    max-width: 802px;
    min-height: 1120px;
    min-width: min(360px, 88vw);
    width: min(794px, calc(100% - 36px));
  }

  .textos-paper > div[id] {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }

  .textos-paper .tox.tox-tinymce {
    background: #fff !important;
    border: 0;
    border-radius: 0;
    height: 100% !important;
    min-height: 100%;
  }

  .textos-paper .tox .tox-editor-header,
  .textos-paper .tox .tox-statusbar {
    display: none;
  }

  .textos-paper .tox .tox-edit-area {
    background: #fff !important;
    border: 0;
  }

  .textos-paper .tox .tox-edit-area::before {
    border: 0;
  }

  .textos-paper .tox .tox-edit-area__iframe {
    background: #fff !important;
    color-scheme: light;
  }

  .textos-return-dialog-backdrop {
    align-items: center;
    background: rgb(32 43 59 / 60%);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 20px;
    position: absolute;
    z-index: 10;
  }

  .textos-return-dialog {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 4px 4px 0 #31302c;
    max-width: 420px;
    padding: 18px;
    width: 100%;

    h2 {
      font-size: clamp(18px, 2vw, 24px);
      margin: 0 0 12px;
    }

    p {
      margin: 0 0 18px;
    }
  }

  .textos-return-dialog-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;

    button {
      background: #d7e4f7;
      border: 2px solid #31302c;
      box-shadow: 2px 2px 0 #31302c;
      color: #31302c;
      cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
      font: inherit;
      padding: 7px 10px;

      &:hover,
      &:focus-visible {
        background: #7d94b8;
        outline: 2px solid #31302c;
      }
    }
  }

  @media (max-width: 760px) {
    .textos-ribbon {
      flex-basis: 46px;
    }

    .textos-library-button {
      min-width: 40px;
    }

    .textos-library-button span {
      display: none;
    }

    .textos-home-sidebar {
      flex-basis: 145px;
      padding: 0 8px;
    }

    .textos-models-area {
      padding: 18px 14px;
    }

    .textos-template-list {
      gap: 14px;
      justify-content: center;
    }

    .textos-paper {
      flex-basis: 76%;
      width: 76%;
    }
  }
`;

export default StyledTextos;
