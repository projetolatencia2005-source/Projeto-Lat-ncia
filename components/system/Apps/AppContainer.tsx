import { useEffect, useRef, useState } from "react";
import styled, { type IStyledComponent } from "styled-components";
import { type FastOmit } from "styled-components/dist/types";
import StyledLoading from "components/system/Apps/StyledLoading";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import { useProcess } from "contexts/process";
import { installDoorsCursorStyles } from "utils/doorsCursor";

export type ContainerHookProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  id: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
};

type AppContainerProps = ContainerHookProps & {
  className?: string;
  StyledComponent?: IStyledComponent<
    "web",
    FastOmit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      never
    >
  >;
};

const StyledAppContainer = styled.div``;

export const useAppContainer = (id: string): ContainerHookProps => {
  const { url = "" } = useProcess(id);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  return { containerRef, id, loading, setLoading, url };
};

const AppContainer: FC<AppContainerProps> = ({
  children,
  className,
  containerRef,
  id,
  loading,
  StyledComponent,
}) => {
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const frameListeners = new Map<HTMLIFrameElement, () => void>();
    const registerFrame = (frame: HTMLIFrameElement): void => {
      if (frameListeners.has(frame)) return;

      const installStyles = (): void => {
        try {
          installDoorsCursorStyles(frame.contentDocument);
        } catch {
          // Cross-origin programs keep their own cursor context.
        }
      };

      frame.addEventListener("load", installStyles);
      frameListeners.set(frame, installStyles);
      installStyles();
    };
    const registerFrames = (element: ParentNode): void => {
      if (element instanceof HTMLIFrameElement) registerFrame(element);

      element.querySelectorAll("iframe").forEach((frame) => {
        registerFrame(frame);
      });
    };
    const observer = new MutationObserver((records) => {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (node instanceof Element) registerFrames(node);
        });
      });
    });

    registerFrames(container);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      frameListeners.forEach((listener, frame) =>
        frame.removeEventListener("load", listener)
      );
    };
  }, [containerRef]);

  const style: React.CSSProperties = {
    contain: "strict",
    visibility: loading ? "hidden" : "visible",
  };
  const StyledWrapper = StyledComponent || StyledAppContainer;

  return (
    <>
      {loading && <StyledLoading />}
      <StyledWrapper
        ref={containerRef}
        aria-busy={loading || undefined}
      className={className}
        style={style}
        {...useFileDrop({ id })}
      >
        {children}
      </StyledWrapper>
    </>
  );
};

export default AppContainer;
