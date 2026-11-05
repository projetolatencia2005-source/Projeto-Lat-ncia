import { useState } from "react";
import StyledCalculator from "components/apps/Calculator/StyledCalculator";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";

type Operator = "+" | "÷" | "×" | "−";

type PendingOperation = {
  left: number;
  operator: Operator;
};

const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return "Erro";

  const rounded = Number.parseFloat(value.toPrecision(12));

  return Object.is(rounded, -0) ? "0" : String(rounded);
};

const applyOperation = (
  left: number,
  right: number,
  operator: Operator
): number => {
  switch (operator) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right === 0 ? Number.NaN : left / right;
    default:
      return right;
  }
};

const Calculator: FC<ComponentProcessProps> = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [pendingOperation, setPendingOperation] =
    useState<null | PendingOperation>(null);
  const [replaceDisplay, setReplaceDisplay] = useState(false);

  const clear = (): void => {
    setDisplay("0");
    setExpression("");
    setPendingOperation(null);
    setReplaceDisplay(false);
  };

  const appendDigit = (digit: string): void => {
    if (replaceDisplay) {
      setDisplay(digit);
      setReplaceDisplay(false);
      return;
    }

    setDisplay((current) => {
      if (current === "Erro") return digit;
      if (current === "0") return digit;
      if (current.length >= 16) return current;

      return current + digit;
    });
  };

  const appendDecimal = (): void => {
    if (replaceDisplay) {
      setDisplay("0.");
      setReplaceDisplay(false);
      return;
    }

    setDisplay((current) =>
      current === "Erro"
        ? "0."
        : current.includes(".")
          ? current
          : `${current}.`
    );
  };

  const chooseOperator = (operator: Operator): void => {
    const current = Number(display);

    if (pendingOperation && !replaceDisplay) {
      const result = applyOperation(
        pendingOperation.left,
        current,
        pendingOperation.operator
      );
      const formattedResult = formatNumber(result);

      setDisplay(formattedResult);
      setPendingOperation({ left: result, operator });
      setExpression(`${formattedResult} ${operator}`);
    } else {
      const left = Number.isFinite(current) ? current : 0;

      setPendingOperation({ left, operator });
      setExpression(`${formatNumber(left)} ${operator}`);
    }

    setReplaceDisplay(true);
  };

  const calculate = (): void => {
    if (!pendingOperation) return;

    const right = Number(display);
    const result = applyOperation(
      pendingOperation.left,
      Number.isFinite(right) ? right : 0,
      pendingOperation.operator
    );

    setExpression(
      `${formatNumber(pendingOperation.left)} ${pendingOperation.operator} ${formatNumber(Number.isFinite(right) ? right : 0)} =`
    );
    setDisplay(formatNumber(result));
    setPendingOperation(null);
    setReplaceDisplay(true);
  };

  const toggleSign = (): void => {
    setDisplay((current) => {
      const value = Number(current);

      return !Number.isFinite(value) || value === 0
        ? current
        : formatNumber(-value);
    });
    setReplaceDisplay(false);
  };

  const applyPercent = (): void => {
    setDisplay((current) => {
      const value = Number(current);

      return Number.isFinite(value) ? formatNumber(value / 100) : "0";
    });
    setReplaceDisplay(true);
  };

  const backspace = (): void => {
    if (replaceDisplay) return;

    setDisplay((current) => {
      if (current === "Erro" || current.length <= 1) return "0";

      const shortened = current.slice(0, -1);

      return shortened === "-" ? "0" : shortened;
    });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    const { key } = event;

    if (/^\d$/.test(key)) appendDigit(key);
    else if (key === "." || key === ",") appendDecimal();
    else if (key === "+" || key === "-")
      {chooseOperator(key === "+" ? "+" : "−");}
    else if (key === "*") chooseOperator("×");
    else if (key === "/") chooseOperator("÷");
    else if (key === "%") applyPercent();
    else if (key === "Enter" || key === "=") calculate();
    else if (key === "Backspace") backspace();
    else if (key === "Escape") clear();
    else return;

    event.preventDefault();
  };

  return (
    <StyledCalculator
      aria-label="Calculadora"
      onKeyDown={onKeyDown}
      role="application"
      tabIndex={0}
    >
      <section
        aria-label="Calculadora básica"
        className="doors-calculator-shell"
      >
        <div
          aria-live="polite"
          className="doors-calculator-display"
          role="status"
        >
          <span className="doors-calculator-expression">
            {expression || "\u00A0"}
          </span>
          <output aria-label="Visor" className="doors-calculator-result">
            {display}
          </output>
        </div>
        <div className="doors-calculator-keypad">
          <button
            aria-label="Limpar tudo"
            className="doors-calculator-key is-utility"
            onClick={clear}
            type="button"
          >
            C
          </button>
          <button
            aria-label="Inverter sinal"
            className="doors-calculator-key is-utility"
            onClick={toggleSign}
            type="button"
          >
            ±
          </button>
          <button
            aria-label="Porcentagem"
            className="doors-calculator-key is-utility"
            onClick={applyPercent}
            type="button"
          >
            %
          </button>
          <button
            aria-label="Dividir"
            className="doors-calculator-key is-operator"
            onClick={() => chooseOperator("÷")}
            type="button"
          >
            ÷
          </button>
          {["7", "8", "9"].map((digit) => (
            <button
              key={digit}
              className="doors-calculator-key"
              onClick={() => appendDigit(digit)}
              type="button"
            >
              {digit}
            </button>
          ))}
          <button
            aria-label="Multiplicar"
            className="doors-calculator-key is-operator"
            onClick={() => chooseOperator("×")}
            type="button"
          >
            ×
          </button>
          {["4", "5", "6"].map((digit) => (
            <button
              key={digit}
              className="doors-calculator-key"
              onClick={() => appendDigit(digit)}
              type="button"
            >
              {digit}
            </button>
          ))}
          <button
            aria-label="Subtrair"
            className="doors-calculator-key is-operator"
            onClick={() => chooseOperator("−")}
            type="button"
          >
            −
          </button>
          {["1", "2", "3"].map((digit) => (
            <button
              key={digit}
              className="doors-calculator-key"
              onClick={() => appendDigit(digit)}
              type="button"
            >
              {digit}
            </button>
          ))}
          <button
            aria-label="Somar"
            className="doors-calculator-key is-operator"
            onClick={() => chooseOperator("+")}
            type="button"
          >
            +
          </button>
          <button
            aria-label="Apagar último dígito"
            className="doors-calculator-key is-utility"
            onClick={backspace}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              stroke="#31302c"
              strokeLinejoin="miter"
              strokeWidth="2"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 5H29V27H11L3 16L11 5Z" fill="#f7edd7" />
              <path d="m15 12 8 8m0-8-8 8" />
            </svg>
          </button>
          <button
            className="doors-calculator-key"
            onClick={() => appendDigit("0")}
            type="button"
          >
            0
          </button>
          <button
            aria-label="Separador decimal"
            className="doors-calculator-key"
            onClick={appendDecimal}
            type="button"
          >
            .
          </button>
          <button
            aria-label="Igual"
            className="doors-calculator-key is-equals"
            onClick={calculate}
            type="button"
          >
            =
          </button>
        </div>
      </section>
    </StyledCalculator>
  );
};

export default Calculator;
