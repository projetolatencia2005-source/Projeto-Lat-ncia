import styled from "styled-components";

type StyledFigureProps = {
  $imageThumbnail: boolean;
  $renaming: boolean;
};

const StyledFigure = styled.figure<StyledFigureProps>`
  pointer-events: ${({ $renaming }) => ($renaming ? "all" : undefined)};

  > picture > img {
    box-shadow: ${({ $imageThumbnail }) =>
      $imageThumbnail ? "3px 3px 0 #31302C" : "none"};
    outline: ${({ $imageThumbnail }) =>
      $imageThumbnail ? "2px solid #31302C" : "none"};
  }

  figcaption {
    pointer-events: none;
  }
`;

export default StyledFigure;
