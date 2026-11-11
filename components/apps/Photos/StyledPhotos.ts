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
    position: relative;
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

  .doors-photo-special-key {
    background: transparent;
    border: 0;
    cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
    height: 100%;
    inset: 0;
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: 1;

    &:focus-visible {
      outline: 2px dashed #7d94b8;
      outline-offset: -2px;
    }
  }

  .doors-photo-nav {
    align-items: center;
    background: transparent;
    border: 0;
    box-shadow: none;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    display: flex;
    height: 25px;
    justify-content: center;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    z-index: 2;

    img {
      display: block;
      height: 25px;
      image-rendering: pixelated;
      width: 25px;
    }

    &:hover {
      opacity: 0.9;
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
