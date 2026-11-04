type DirectionArrowDirection = "down" | "left" | "right" | "up";

const DIRECTION_ARROW_ASSET: Record<DirectionArrowDirection, string> = {
  down: "/System/Doors/Arrows/Baixo.svg",
  left: "/System/Doors/Arrows/Esquerda.svg",
  right: "/System/Doors/Arrows/Direita.svg",
  up: "/System/Doors/Arrows/Cima.svg",
};

const DirectionArrow: FC<{
  className?: string;
  direction: DirectionArrowDirection;
  size?: number;
}> = ({ className, direction, size = 20 }) => (
  <img
    alt=""
    aria-hidden="true"
    className={className}
    draggable={false}
    src={DIRECTION_ARROW_ASSET[direction]}
    style={{
      display: "block",
      flex: "0 0 auto",
      height: size,
      objectFit: "contain",
      pointerEvents: "none",
      width: size,
    }}
  />
);

export default DirectionArrow;
