import styled from "styled-components";

type StyledProfileProps = {
  $clickable?: boolean;
};

const StyledProfile = styled.figure<StyledProfileProps>`
  > button {
    display: flex;
    place-items: center;
  }

  > button,
  > div {
    background-color: transparent;
    cursor: ${({ $clickable }) =>
      $clickable
        ? 'url("/System/Doors/cursors/hand.svg") 0 0, pointer'
        : 'url("/System/Doors/cursors/mouse.svg") 0 0, default'};
    position: relative;

    > img,
    > svg {
      cursor: inherit;
    }

    div.verified {
      cursor: inherit;

      svg {
        border: none;
        bottom: 2px;
        color: #000;
        cursor: inherit;
        fill: #000;
        height: 18px;
        left: -2px;
        max-width: 18px;
        min-height: auto;
        min-width: 18px;
        position: absolute;
        width: 18px;

        path {
          cursor: inherit;
        }
      }
    }
  }
`;

export default StyledProfile;
