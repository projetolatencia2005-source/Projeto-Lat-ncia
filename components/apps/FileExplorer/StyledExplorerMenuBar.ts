import styled from "styled-components";

const StyledExplorerMenuBar = styled.nav`
  align-items: stretch;
  background: #dce5f0;
  border-bottom: 2px solid #31302c;
  display: flex;
  flex: 0 0 ${({ theme }) => theme.sizes.fileExplorer.menuBarHeight};
  height: ${({ theme }) => theme.sizes.fileExplorer.menuBarHeight};
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 4px;
  scrollbar-width: thin;

  > button {
    background: transparent;
    border: 1px solid transparent;
    color: #202b3b;
    flex: 0 0 auto;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 15px;
    line-height: 1;
    padding: 0 11px;
    white-space: nowrap;

    &:hover,
    &[aria-expanded="true"] {
      background: #edf3fa;
      border-color: #8b9cb3;
    }

    &:active {
      background: #c6d5e8;
      border-color: #617995;
    }
  }

  > .start-menu {
    align-items: center;
    background: #fff;
    border: 0;
    border-left: 2px solid #9baec4;
    border-radius: 0;
    display: flex;
    flex: 0 0 36px;
    justify-content: center;
    margin-left: auto;
    margin-right: -4px;
    padding: 0;
    width: 36px;

    .figma-door-mark {
      height: 24px;
      overflow: hidden;
      position: relative;
      width: 16px;
    }

    .figma-door-mark img {
      height: 100%;
      image-rendering: pixelated;
      left: -270.37%;
      max-width: none;
      position: absolute;
      top: 0;
      width: 370.73%;
    }
  }

  @media (max-width: 540px) {
    > button {
      font-size: 13px;
      padding: 0 8px;
    }
  }
`;

export default StyledExplorerMenuBar;
