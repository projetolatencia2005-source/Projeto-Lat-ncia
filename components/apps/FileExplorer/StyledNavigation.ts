import styled from "styled-components";

const StyledNavigation = styled.nav`
  align-items: stretch;
  background: #dce5f0;
  border-bottom: 2px solid #31302c;
  display: flex;
  flex: 0 0 ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};
  height: ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  scrollbar-width: thin;

  svg {
    color: #26364b;
    fill: currentColor;
    flex: 0 0 auto;
    height: 20px;
    transition: color 0.2s ease;
    width: 20px;
  }

  .figma-arrow-glyph {
    flex: 0 0 auto;
  }

  .toolbar-group {
    align-items: stretch;
    border-right: 2px solid #31302c;
    display: flex;
    flex: 0 0 auto;
    gap: 2px;
    padding: 0 7px;
  }

  .toolbar-group > button {
    align-items: center;
    background: transparent;
    border: 1px solid transparent;
    color: #26364b;
    display: flex;
    flex: 0 0 auto;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 14px;
    gap: 6px;
    height: 30px;
    justify-content: center;
    margin: auto 0;
    max-height: 30px;
    min-height: 30px;
    min-width: 0;
    padding: 0 7px;
    white-space: nowrap;
    width: auto;

    &:hover:not(:disabled),
    &[aria-expanded="true"] {
      background: #edf3fa;
      border-color: #91a3bb;
    }

    &:active:not(:disabled) {
      background: #c4d4e8;
      border-color: #667e9c;
    }

    &:disabled {
      color: #8595aa;
    }

    &:disabled svg {
      color: #9cacc0;
    }

    svg {
      height: 18px;
      width: 18px;
    }
  }

  .history-controls {
    gap: 0;
    padding: 0 5px;
    position: relative;

    > button:not(.recent) {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
      gap: 5px;
      padding: 0 7px;
    }

    > button + button:not(.recent) {
      margin-left: 3px;
      position: relative;

      &::before {
        background: #31302c;
        content: "";
        height: calc(100% + 30px);
        left: -4px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
      }
    }

    > button:disabled .figma-arrow-glyph {
      opacity: 0.5;
    }
  }

  .explorer-tools {
    position: relative;
    padding: 0 8px;

    .tool-button {
      min-width: 112px;
      padding: 0 12px;
    }

    .tool-button + .tool-button {
      border-left: 2px solid #31302c;
      height: 100%;
      max-height: none;
      min-height: 100%;
    }

    picture {
      display: flex;
      flex: 0 0 24px;
      height: 24px;
      width: 24px;
    }

    .explorer-folder-icon {
      flex: 0 0 auto;
      height: 17px;
      image-rendering: pixelated;
      object-fit: contain;
      width: 24px;
    }

    .figma-search-icon {
      flex: 0 0 auto;
      height: 22px;
      image-rendering: pixelated;
      object-fit: contain;
      width: 18px;
    }
  }

  .address-group {
    align-items: center;
    border-right: 0;
    flex: 1 1 280px;
    min-width: 230px;
    padding: 0 3px 0 8px;

    .address-label {
      color: #26364b;
      flex: 0 0 auto;
      font-size: 15px;
      margin-right: 9px;
      white-space: nowrap;
    }

    .address-entry {
      flex: 1 1 auto;
      height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
      margin: 0;
      min-width: 100px;
      width: auto;

      input {
        background: #fff;
        color: #38465a;
        font-size: 13px;
        height: 100%;
      }
    }
  }

  &.compact {
    .history-controls > button:not(.recent) {
      padding: 0 6px;

      span {
        display: none;
      }
    }

    .explorer-tools {
      padding: 0 4px;

      .tool-button {
        min-width: 42px;
        padding: 0 7px;

        span {
          display: none;
        }
      }
    }

    .address-group {
      min-width: 190px;
      padding: 0 3px 0 5px;

      .address-label {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }

  @media (max-width: 620px) {
    .history-controls > button:not(.recent) {
      gap: 3px;
      padding: 0 6px;
    }

    .explorer-tools {
      padding: 0 4px;

      .tool-button {
        min-width: 42px;
        padding: 0 7px;
      }

      .tool-button span {
        display: none;
      }
    }

    .address-group {
      min-width: 180px;
      padding: 0 3px 0 5px;

      .address-label {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
`;

export default StyledNavigation;
