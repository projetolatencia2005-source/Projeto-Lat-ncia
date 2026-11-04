import styled from "styled-components";

const StyledCalculator = styled.main`
  align-items: stretch;
  background: #7d94b8;
  color: #31302c;
  cursor: url("/System/Doors/cursors/mouse.svg") 0 0, default;
  display: flex;
  font-family: ${({ theme }) => theme.formats.systemFont};
  height: 100%;
  justify-content: stretch;
  min-height: 0;
  outline: none;
  padding: 0;
  width: 100%;

  &:focus-visible {
    outline: 2px dashed #31302c;
    outline-offset: -5px;
  }

  .doors-calculator-shell {
    background: #7d94b8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    max-width: none;
    min-height: 0;
    padding: 8px;
    width: 100%;
  }

  .doors-calculator-display {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: inset 2px 2px 0 rgb(49 48 44 / 28%);
    display: flex;
    flex: 0 0 25%;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 0;
    overflow: hidden;
    padding: 6px 10px;
    text-align: right;
  }

  .doors-calculator-expression {
    color: #53657b;
    font-size: 17px;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .doors-calculator-result {
    color: #202b3b;
    display: block;
    font-family: "Pixelify Sans", monospace;
    font-size: clamp(36px, 8vw, 54px);
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .doors-calculator-keypad {
    display: grid;
    flex: 1;
    gap: 6px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
    min-height: 0;
  }

  .doors-calculator-key {
    background: #f7edd7;
    border: 2px solid #31302c;
    box-shadow: 3px 3px 0 #31302c;
    color: #31302c;
    cursor: url("/System/Doors/cursors/hand.svg") 0 0, pointer;
    font: inherit;
    font-size: clamp(19px, 5vw, 25px);
    min-height: 0;
    padding: 4px;
    transition:
      background-color 80ms linear,
      transform 80ms linear,
      box-shadow 80ms linear;

    &:hover,
    &:focus-visible {
      background: #d7e4f7;
      outline: 2px solid #31302c;
      outline-offset: 1px;
    }

    &:active {
      box-shadow: inset 2px 2px 0 rgb(49 48 44 / 40%);
      transform: translate(2px, 2px);
    }

    svg {
      display: block;
      height: 28px;
      margin: auto;
      width: 28px;
    }
  }

  .doors-calculator-key.is-utility {
    background: #d7e4f7;
  }

  .doors-calculator-key.is-operator,
  .doors-calculator-key.is-equals {
    background: #7d94b8;
    font-weight: 700;
  }

  .doors-calculator-key.is-equals {
    background: #dbd0ba;
  }

  @media (max-width: 380px) {
    .doors-calculator-shell {
      gap: 9px;
      padding: 9px;
    }
  }
`;

export default StyledCalculator;
