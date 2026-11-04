import styled from "styled-components";

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  padding-top: 4px;
  position: absolute;
  top: 0;
  transition-duration: 150ms;
  width: ${({ theme }) => theme.sizes.startMenu.sideBar.width}px;
  z-index: 1;
  background-color: #ded3bb;
  border-right: 1px solid #302e2a;

  &:hover:not(.collapsed),
  :root[data-keyboard] &:focus-within:not(.collapsed) {
    background-color: #f5eed7;
    box-shadow: 3px 0 0 rgba(36, 33, 28, 20%);
    transition:
      all 300ms ease,
      backdrop-filter 1ms;
    transition-timing-function: cubic-bezier(0.15, 1, 0.5, 1);
    width: ${({ theme }) => theme.sizes.startMenu.sideBar.expandedWidth};

    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
      background-color: #f5eed7;
    }

    &::before {
      backdrop-filter: none;
      background-color: #f5eed7;
      content: "";
      height: 100%;
      margin-top: -4px;
      position: absolute;
      width: 100%;
      z-index: -100000;
    }
  }

  &.collapsed {
    transition:
      all 300ms ease,
      backdrop-filter 600ms;
  }
`;

export default StyledSidebar;
