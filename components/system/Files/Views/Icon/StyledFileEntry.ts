import styled from "styled-components";
import { type StyledFileEntryProps } from "components/system/Files/Views";

const StyledFileEntry = styled.li<StyledFileEntryProps>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  height: ${({ $desktop }) => ($desktop ? "100px" : "min-content")};
  outline-offset: -2px;
  margin: ${({ $desktop }) => ($desktop ? "0 10px" : undefined)};
  padding: ${({ $desktop, theme }) =>
    $desktop ? "0" : theme.sizes.fileEntry.iconPadding};
  width: ${({ $desktop }) => ($desktop ? "100px" : undefined)};

  &.doors-computer-file-entry {
    align-self: center;
    height: 100px;
    justify-self: center;
    margin: 0;
    width: 100px;
  }

  button {
    position: relative;

    ${({ $desktop }) =>
      $desktop &&
      `
        align-items: center;
        box-sizing: border-box;
        display: flex;
        height: 100%;
        justify-content: center;
        padding: 0;
        width: 100%;
      `}

    figure {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: ${({ $desktop }) => ($desktop ? "10px" : undefined)};
      height: ${({ $desktop }) => ($desktop ? "100%" : undefined)};
      justify-content: ${({ $desktop }) => ($desktop ? "center" : undefined)};
      margin-bottom: ${({ $desktop }) => ($desktop ? "0" : "-2px")};
      place-items: center;
      width: ${({ $desktop }) => ($desktop ? "100%" : undefined)};

      figcaption {
        color: ${({ $desktop, theme }) =>
          $desktop ? "#31302C" : theme.colors.fileEntry.text};
        font-size: ${({ $desktop, theme }) =>
          $desktop ? "16px" : theme.sizes.fileEntry.fontSize};
        line-height: 1.2;
        margin: ${({ $desktop }) => ($desktop ? "0" : "1px 0")};
        overflow-wrap: anywhere;
        padding: ${({ $desktop }) => ($desktop ? "0" : "2px 0")};
        text-align: ${({ $desktop }) => ($desktop ? "center" : undefined)};
        text-shadow: ${({ $desktop }) =>
          $desktop ? "1px 1px 0 #F7EDD7" : undefined};
        -webkit-text-stroke: ${({ $desktop }) => ($desktop ? "0" : undefined)};
        width: ${({ $desktop }) => ($desktop ? "100%" : undefined)};

        &.desktop-documents-label {
          min-width: max-content;
          text-align: center;
          white-space: nowrap;
        }

        @supports not (overflow-wrap: anywhere) {
          /* stylelint-disable declaration-property-value-keyword-no-deprecated */
          word-break: break-word;
        }
      }

      textarea {
        position: absolute;
        top: ${({ theme }) => theme.sizes.fileEntry.iconSize};
      }

      picture {
        height: ${({ $desktop, theme }) =>
          $desktop ? "40px" : theme.sizes.fileEntry.iconSize};
        transform: ${({ $desktop }) => ($desktop ? "scale(1)" : undefined)};
        width: ${({ $desktop, theme }) =>
          $desktop ? "40px" : theme.sizes.fileEntry.iconSize};

        &:not(:first-of-type) {
          position: absolute;

          img {
            position: absolute;
          }
        }
      }
    }
  }

  button.doors-post-it-shortcut figure picture:first-of-type {
    height: 40px;
    width: 40px;
  }

  button.doors-pastas-shortcut figure {
    gap: 0;

    picture:first-of-type {
      height: 46px;
      width: 46px;
    }
  }

  button.doors-picture-thumbnail figure > picture:first-of-type {
    display: block;
    flex: 0 0 100px;
    height: 100px;
    overflow: hidden;
    width: 100px;

    > img {
      aspect-ratio: 1;
      height: 100px !important;
      max-height: 100px !important;
      max-width: 100px !important;
      min-height: 100px !important;
      min-width: 100px !important;
      object-fit: cover;
      width: 100px !important;
    }
  }

  button.doors-computer-shortcut {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 100px;
    justify-content: center;
    padding: 0;
    width: 100px;

    figure {
      gap: 3px;
      height: 100%;
      justify-content: center;
      margin-bottom: 0;
      width: 100%;

      figcaption.computer-shortcut-label {
        font-size: 16px;
        line-height: 1.2;
        min-width: 0;
        overflow-wrap: anywhere;
        padding: 0;
        text-align: center;
        transform: translateY(3px);
        white-space: normal;
        width: 100px;
      }

      picture:not(:first-of-type) {
        display: none;
      }

      picture:first-of-type {
        height: 40px;
        transform: translateY(-5px);
        width: 40px;
      }
    }
  }

  button.doors-locked-folder-shortcut figure picture:first-of-type {
    transform: none;
  }

  /* Outside, as captions run past the bottom edge of the button */
  :root[data-keyboard] & > button:focus {
    box-shadow: 0 0 0 1px var(--focus-inner, rgb(0 0 0));
    outline-offset: 1px;
  }

  /* Like Explorer, a lone selected entry already shows where focus is */
  :root[data-keyboard] :not(.multi-select) > &.focus-within > button:focus {
    box-shadow: none;
    outline: 0;
  }

  /* Apart from the first rule, as stylelint wants ascending specificity */
  :root[data-keyboard]
    ol[tabindex]:not(.has-selection):focus
    > &:first-of-type
    > button {
    box-shadow: 0 0 0 1px var(--focus-inner, rgb(0 0 0));
    outline-offset: 1px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.fileEntry.background};
    outline: ${({ $desktop, theme }) =>
      $desktop ? `1px solid ${theme.colors.fileEntry.border}` : undefined};
  }

  &.focus-within {
    background-color: ${({ theme }) =>
      theme.colors.fileEntry.backgroundFocused};
    outline: ${({ $desktop, theme }) =>
      $desktop
        ? `1px solid ${theme.colors.fileEntry.borderFocused}`
        : undefined};
    z-index: 1;

    @media (forced-colors: active) {
      outline: 1px solid highlight;
      outline-offset: -1px;
    }

    &:hover {
      background-color: ${({ $selecting, theme }) =>
        $selecting
          ? theme.colors.fileEntry.backgroundFocused
          : theme.colors.fileEntry.backgroundFocusedHover};
      outline: ${({ $desktop, theme }) =>
        $desktop
          ? `1px solid ${theme.colors.fileEntry.borderFocusedHover}`
          : undefined};
    }
  }
`;

export default StyledFileEntry;
