import DirectionArrow from "components/system/DirectionArrow";
import { FILE_EXPLORER_SEARCH_ICON, SEARCH_ICON } from "utils/constants";

type PixelArrowDirection = "back" | "down" | "forward" | "right" | "up";

export const PixelArrow: FC<{
  direction: PixelArrowDirection;
  size?: number;
}> = ({ direction, size = 14 }) => (
  <DirectionArrow
    className="figma-arrow-glyph"
    direction={
      direction === "back"
        ? "left"
        : direction === "forward" || direction === "right"
          ? "right"
          : direction
    }
    size={size}
  />
);

export const Back: FC = () => <PixelArrow direction="back" size={30} />;

export const Forward: FC = () => <PixelArrow direction="forward" size={30} />;

type DownProps = { flip?: boolean };

export const Down: FC<DownProps> = ({ flip }) => {
  const style = flip
    ? { transform: "scaleY(-1)", transition: "all 0.2s" }
    : undefined;

  return (
    <svg
      aria-hidden="true"
      style={style}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m28.109 5.453 3.781 3.766L15.999 25.11.108 9.219l3.781-3.766 12.109 12.109L28.107 5.453z" />
    </svg>
  );
};

export const GoTo: FC = () => <PixelArrow direction="right" size={30} />;

export const Up: FC = () => <PixelArrow direction="up" size={30} />;

export const Search: FC = () => (
  <img
    aria-hidden="true"
    alt=""
    className="doors-search-icon"
    draggable={false}
    src={SEARCH_ICON}
  />
);

export const ExplorerSearch: FC = () => (
  <img
    aria-hidden="true"
    alt=""
    className="figma-search-icon"
    draggable={false}
    src={FILE_EXPLORER_SEARCH_ICON}
  />
);
