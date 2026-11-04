import styled from "styled-components";

const StyledAddressBar = styled.div`
  background-color: #fff;
  border: 2px solid #31302c;
  display: flex;
  height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
  margin: 3px 0;
  overflow: hidden;
  padding: 0 0 0 8px;
  position: relative;
  width: 100%;

  input {
    background-color: #fff;
    color: #31302c;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 12px;
    font-weight: 400;
    height: 100%;
    padding: 0 36px 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:focus,
    &.inputing {
      height: 100%;
    }
  }

  .action {
    background: transparent;
    border: 0;
    box-shadow: none;
    display: flex;
    height: 30px;
    margin: 0;
    place-content: center;
    place-items: center;
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;

    &:hover {
      filter: brightness(1.04);
    }

    &:active {
      filter: brightness(0.94);
    }

    .figma-arrow-glyph {
      position: relative;
      z-index: 1;
    }
  }
`;

export default StyledAddressBar;
