import styled from "styled-components";

const StyledDesktop = styled.main`
  background-color: transparent;
  contain: strict;
  height: 100%;
  inset: 0;
  overflow: clip;
  overscroll-behavior: none;
  position: fixed;
  width: 100vw;

  > ol {
    padding-top: clamp(12px, 0.938vw, 18px);
    row-gap: 3px;
  }

  #loading-status {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    box-shadow: 0 0 50px 1px #000;
    display: none;
    font-weight: 600;
    left: 50%;
    padding: 12px 15px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
  }

  .doors-speech-caption {
    background: #31302C;
    bottom: clamp(54px, 7.5vh, 86px);
    box-sizing: border-box;
    color: #f7edd7;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(12px, 1.25vw, 18px);
    font-weight: 400;
    left: 50%;
    line-height: 1.2;
    max-width: calc(100vw - 32px);
    overflow: hidden;
    padding: 6px 12px;
    pointer-events: none;
    position: absolute;
    text-align: center;
    text-overflow: ellipsis;
    text-transform: none;
    transform: translateX(-50%);
    white-space: nowrap;
    width: 44vw;
    z-index: 2147483000;
  }

  @media (max-width: 600px) {
    .doors-speech-caption {
      font-size: clamp(12px, 3vw, 16px);
      padding: 6px 10px;
      width: calc(100vw - 32px);
    }
  }

  > canvas {
    background-color: inherit;
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

export default StyledDesktop;
