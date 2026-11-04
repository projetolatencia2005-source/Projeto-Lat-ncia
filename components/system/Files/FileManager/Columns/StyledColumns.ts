import styled from "styled-components";

const StyledColumns = styled.span`
  background-color: #ded3bb;
  display: block;
  margin-bottom: 6px;
  margin-right: ${({ theme }) => theme.sizes.fileManager.detailsStartPadding}px;
  position: sticky;
  top: 0;
  width: fit-content;
  z-index: 1;

  ol {
    display: flex;
    height: ${({ theme }) => theme.sizes.fileManager.columnHeight}px;

    li {
      color: #302e2a;
      display: flex;
      font-size: 12px;
      padding-left: 6px;
      place-items: center;
      position: relative;

      > svg {
        fill: rgb(88 81 70);
        left: calc(50% - 4px);
        position: absolute;
        top: 0;
        transition: none !important;
        width: 7px;

        &[style^="transform"] {
          top: -1px;
        }
      }

      .name {
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        top: -1px;
        white-space: nowrap;
      }

      .resize {
        border-left: 1px solid #8c8069;
        cursor: col-resize;
        height: ${({ theme }) => theme.sizes.fileManager.columnHeight}px;
        padding-left: ${({ theme }) =>
          theme.sizes.fileManager.columnResizeWidth}px;
        position: absolute;
        right: -${({ theme }) => theme.sizes.fileManager.columnResizeWidth}px;
        z-index: 1;
      }

      &:hover {
        background-color: #e6ddc5;

        .resize {
          border-left: none;
        }
      }

      &:active {
        background-color: #d7c8aa;
      }

      &:first-child {
        padding-left: 17px;
      }
    }
  }
`;

export default StyledColumns;
