import styled from "styled-components";
import Message from "styles/common/Message";

type StyledPhotosProps = {
  $showImage: boolean;
};

const StyledPhotos = styled.div<StyledPhotosProps>`
  background-color: #d7e4f7;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  position: relative;

  svg {
    fill: #31302c;
  }

  figure {
    background: #f7edd7;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    margin: 0;
    overflow: hidden;
    place-content: center;
    place-items: center;
    width: 100%;

    div {
      color: #31302c;
      font-size: 13px;
      padding: 0 38px;
      text-align: center;
    }

    img {
      display: ${({ $showImage }) => ($showImage ? "block" : "none")};
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  }

  .doors-photo-nav {
    align-items: center;
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 2px 2px 0 #31302c;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    height: 44px;
    justify-content: center;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    z-index: 2;

    img {
      display: block;
      height: 25px;
      image-rendering: pixelated;
      width: 25px;
    }

    &:hover {
      background: #e9dfcb;
    }
  }

  .doors-photo-nav-previous {
    left: 10px;
  }

  .doors-photo-nav-next {
    right: 10px;
  }

  &.drop {
    ${Message("Drop photo file here", "#31302c")};
  }
`;

export default StyledPhotos;
