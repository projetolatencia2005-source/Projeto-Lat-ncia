import styled, { type DefaultTheme } from "styled-components";

type StyledTitlebarProps = {
  $browser?: boolean;
  $fileExplorer?: boolean;
  $foreground: boolean;
  $paint?: boolean;
  $photos?: boolean;
  $titlebarColor?: string;
};

const styledBorder = ({
  $browser,
  $fileExplorer,
  $foreground,
  $paint,
  $titlebarColor,
  theme,
}: StyledTitlebarProps & { theme: DefaultTheme }): string =>
  $fileExplorer || $browser || $paint || $titlebarColor
    ? "2px solid #31425b"
    : $foreground
      ? `1px solid ${theme.colors.titleBar.background}`
      : `1px solid ${theme.colors.titleBar.backgroundInactive}`;

const StyledTitlebar = styled.header<StyledTitlebarProps>`
  background-color: ${({
    $browser,
    $fileExplorer,
    $foreground,
    $paint,
    $titlebarColor,
    theme,
  }) => {
    if ($titlebarColor) return $titlebarColor;
    if ($paint) return "#7D94B8";
    if ($fileExplorer || $browser) return $foreground ? "#839abc" : "#788ca9";
    return $foreground
      ? theme.colors.titleBar.background
      : theme.colors.titleBar.backgroundInactive;
  }};
  border-bottom: ${styledBorder};
  display: flex;
  height: ${({ theme }) => theme.sizes.titleBar.height}px;
  position: relative;
  top: 0;
  z-index: 2;

  &.doors-post-it-titlebar {
    background: #dbd0ba;
    border-bottom: 2px solid #31302c;

    > button.doors-post-it-create {
      background: transparent;
      border: 0;
      box-shadow: none;
      color: #31302c;
      flex: 0 0 48px;
      font-family: "Pixelify Sans", monospace;
      font-size: 28px;
      font-weight: 700;
      justify-content: center;
      padding: 0;

      span {
        line-height: 1;
      }

      &:hover {
        background: #e9dfcb;
      }
    }
  }

  .browser-tab-strip {
    align-items: flex-end;
    display: flex;
    flex: 1 1 auto;
    gap: 6px;
    height: 100%;
    min-width: 0;
  }

  .browser-tabs {
    align-items: flex-end;
    display: flex;
    flex: 0 1 auto;
    gap: 2px;
    height: 100%;
    margin-left: 5px;
    max-width: calc(100% - 40px);
    min-width: 0;
    overflow-x: clip;
    overflow-y: visible;
    width: max-content;
  }

  .browser-tab-add {
    align-items: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: #31302c;
    display: flex;
    flex: 0 0 34px;
    font-family: "Pixelify Sans", monospace;
    font-size: 25px;
    height: 30px;
    justify-content: center;
    line-height: 1;
    margin-bottom: 2px;
    padding: 0;
    width: 34px;

    &:hover {
      background: rgb(255 255 255 / 45%);
    }
  }

  .browser-tab {
    align-items: center;
    background: #d7e4f7;
    border: 2px solid #31302c;
    border-bottom: 0;
    box-shadow: 2px 0 0 rgb(49 48 44 / 35%);
    box-sizing: border-box;
    display: flex;
    flex: 0 1 190px;
    height: 29px;
    min-width: 86px;
    overflow: hidden;
    padding: 0 3px 0 0;

    &.active {
      background: #f7edd7;
      box-shadow:
        2px 0 0 rgb(49 48 44 / 35%),
        0 2px 0 #f7edd7;
      height: 31px;
      position: relative;
      z-index: 1;
    }

    button {
      background: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      box-sizing: border-box;
      color: #202b3b;
      display: flex;
      font-family: "Pixelify Sans", monospace;
      font-size: 15px;
      height: 100%;
      min-width: 0;
      padding: 0;

      &:hover {
        background: rgb(255 255 255 / 40%);
      }

      &:active {
        background: #c4d4e8;
      }
    }

    .browser-tab-select {
      flex: 1 1 auto;
      justify-content: flex-start;
      overflow: hidden;
      padding-left: 8px;
      padding-top: 3px;
      text-align: left;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        transform: translate(3px, 1px);
        white-space: nowrap;
      }
    }

    .browser-tab-close {
      flex: 0 0 35px;
      justify-content: center;
      width: 35px;

      span {
        font-family: "Pixelify Sans", monospace;
        font-size: 20pt;
        line-height: 1;
        transform: translate(3px, 1px);
      }
    }
  }

  > button {
    align-items: center;
    color: ${({
      $browser,
      $fileExplorer,
      $foreground,
      $paint,
      $titlebarColor,
      theme,
    }) =>
      $fileExplorer || $browser || $paint || $titlebarColor
        ? "#202b3b"
        : $foreground
          ? theme.colors.titleBar.text
          : theme.colors.titleBar.textInactive};
    display: flex;
    flex-grow: 1;
    font-size: ${({ theme }) => theme.sizes.titleBar.fontSize};
    font-weight: 400;
    min-width: 0;

    figure {
      align-items: center;
      display: flex;
      margin-left: 8px;
      min-width: inherit;
      pointer-events: none;
      position: relative;
      top: -1px;

      picture {
        height: ${({ $fileExplorer, $paint, $photos, theme }) =>
          $fileExplorer || $paint
            ? "24px"
            : $photos
              ? "20px"
              : theme.sizes.titleBar.iconSize};
        margin-right: ${({ theme }) => theme.sizes.titleBar.iconMarginRight};
        width: ${({ $fileExplorer, $paint, $photos, theme }) =>
          $fileExplorer
            ? "33px"
            : $paint
              ? "24px"
              : $photos
                ? "20px"
                : theme.sizes.titleBar.iconSize};
      }

      img,
      picture {
        pointer-events: all;
      }

      .explorer-titlebar-icon {
        height: 25px;
        image-rendering: pixelated;
        margin-right: ${({ theme }) => theme.sizes.titleBar.iconMarginRight};
        object-fit: contain;
        width: 28px;
      }

      figcaption {
        font-size: ${({ $browser, $fileExplorer, $photos }) =>
          $fileExplorer || $browser ? "17px" : $photos ? "16px" : undefined};
        overflow: hidden;
        text-overflow: ellipsis;
        transform: ${({ $photos }) => ($photos ? "translateX(3px)" : undefined)};
        white-space: nowrap;
      }
    }
  }

  nav.window-actions {
    align-self: flex-start;
    display: flex;
    flex: 0 0 auto;
    gap: 3px;
    margin-right: 5px;
    margin-top: 3px;

    button {
      box-sizing: border-box;
      display: flex;
      flex: 0 0 30px;
      height: 30px;
      place-content: center;
      place-items: center;
      padding: 0;
      width: 30px;

      svg {
        fill: ${({ $foreground, theme }) =>
          $foreground
            ? theme.colors.titleBar.text
            : theme.colors.titleBar.buttonInactive};
        margin: 0 1px 2px 0;
        width: ${({ theme }) => theme.sizes.titleBar.buttonIconWidth};
      }

      .figma-window-control-icon {
        display: block;
        flex: 0 0 auto;
        height: 30px;
        image-rendering: pixelated;
        width: 30px;
      }

      &.minimize {
        svg {
          margin-bottom: 1px;
          margin-right: 0;
        }
      }

      &:hover {
        background-color: ${({ theme }) =>
          theme.colors.titleBar.backgroundHover};

        svg {
          fill: ${({ theme }) => theme.colors.titleBar.text};
        }

        &.close {
          background-color: ${({ theme }) => theme.colors.titleBar.closeHover};
          transition: background-color 0.25s ease;
        }
      }

      &:active {
        background-color: rgb(51 51 51);

        &.close {
          background-color: rgb(139 10 20);
        }
      }

      &:disabled {
        svg {
          fill: ${({ $foreground }) =>
            $foreground ? "rgb(50, 50, 50)" : "rgb(60, 60, 60)"};
        }

        .figma-window-control-icon {
          opacity: 0.55;
        }

        &:hover {
          background-color: inherit;
        }
      }
    }
  }
`;

export default StyledTitlebar;
