const TitlebarControlIcon: FC<{ name: string }> = ({ name }) => (
  <img
    alt=""
    aria-hidden="true"
    className="figma-window-control-icon"
    draggable={false}
    src={`/System/Doors/figma/window-control-${name}.png`}
  />
);

export const MinimizeIcon: FC = () => <TitlebarControlIcon name="minimize" />;

export const MaximizeIcon: FC = () => <TitlebarControlIcon name="maximize" />;

export const MaximizedIcon: FC = () => <TitlebarControlIcon name="maximize" />;

export const TitlebarCloseIcon: FC = () => (
  <TitlebarControlIcon name="close" />
);

export const CloseIcon: FC = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.2.7L9.5 0 5.1 4.4.7 0 0 .7l4.4 4.4L0 9.5l.7.7 4.4-4.4 4.4 4.4.7-.7-4.4-4.4z" />
  </svg>
);
