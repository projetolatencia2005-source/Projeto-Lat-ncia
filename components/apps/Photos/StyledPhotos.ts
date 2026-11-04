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

  &.drop {
    ${Message("Drop photo file here", "#31302c")};
  }
`;

export default StyledPhotos;
