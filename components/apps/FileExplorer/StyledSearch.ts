import styled from "styled-components";

const StyledSearch = styled.div`
  border: 1px solid #655f52;
  display: flex;
  height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
  margin: 6px 12px 6px 0;
  max-width: 148px;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;

  .doors-search-icon {
    display: none;
  }

  input {
    appearance: none;
    background-color: #fffdf5;
    color: #302e2a;
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 12px;
    font-weight: 400;
    height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight - 2}px;
    padding-bottom: 2px;
    padding-left: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &::-webkit-search-cancel-button {
      filter: invert(1);
      padding-right: 4px;
    }

    &:not(:placeholder-shown) {
      height: ${({ theme }) => theme.sizes.fileExplorer.navInputHeight}px;
    }

    &:focus::placeholder {
      color: transparent;
    }
  }

  input:placeholder-shown ~ .doors-search-icon {
    display: block;
    height: 12px;
    pointer-events: none;
    position: absolute;
    right: 6px;
    top: 5px;
    width: 12px;
  }
`;

export default StyledSearch;
