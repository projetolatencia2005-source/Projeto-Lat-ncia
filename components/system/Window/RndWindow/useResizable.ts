import { useEffect, useLayoutEffect, useState } from "react";
import { type Props } from "react-rnd";
import { useTheme } from "styled-components";
import { minMaxSize } from "components/system/Window/functions";
import useDefaultSize, {
  isCollapsedPostItSize,
} from "components/system/Window/RndWindow/useDefaultSize";
import useMinMaxRef from "components/system/Window/RndWindow/useMinMaxRef";
import { useProcess } from "contexts/process";
import { useSessionActions, useWindowState } from "contexts/session";

export type Size = NonNullable<Props["size"]>;

type Resizable = [Size, React.Dispatch<React.SetStateAction<Size>>];

const useResizable = (id: string, autoSizing = false): Resizable => {
  const defaultSize = useDefaultSize(id);
  const { setWindowStates } = useSessionActions();
  const { size: savedSize } = useWindowState(id);
  const { lockAspectRatio = false, maximized = false, url = "" } =
    useProcess(id);
  const {
    sizes: { titleBar },
  } = useTheme();
  const stateSize = isCollapsedPostItSize(url, savedSize, titleBar.height)
    ? defaultSize
    : savedSize ?? defaultSize;
  const [size, setSize] = useState<Size>(() =>
    minMaxSize(stateSize, lockAspectRatio, titleBar.height)
  );
  const blockAutoSizeRef = useMinMaxRef(id);

  useLayoutEffect(() => {
    if (!maximized) return;

    const resizeToViewport = (): void => {
      setSize(
        minMaxSize(
          { height: window.innerHeight, width: window.innerWidth },
          lockAspectRatio,
          titleBar.height
        )
      );
    };

    resizeToViewport();
    window.addEventListener("resize", resizeToViewport);

    return () => window.removeEventListener("resize", resizeToViewport);
  }, [lockAspectRatio, maximized, titleBar.height]);

  useEffect(() => {
    if (maximized) return;

    const resizeToViewport = (): void => {
      const nextSize = minMaxSize(size, lockAspectRatio, titleBar.height);
      if (
        Number(nextSize.height) === Number(size.height) &&
        Number(nextSize.width) === Number(size.width)
      ) {
        return;
      }

      setSize(nextSize);
      setWindowStates((currentWindowStates) => ({
        ...currentWindowStates,
        [id]: { ...currentWindowStates[id], size: nextSize },
      }));
    };

    window.addEventListener("resize", resizeToViewport, { passive: true });
    return () => window.removeEventListener("resize", resizeToViewport);
  }, [id, lockAspectRatio, maximized, setWindowStates, size, titleBar.height]);

  useLayoutEffect(() => {
    if (!maximized && autoSizing && !blockAutoSizeRef.current) {
      setSize(minMaxSize(stateSize, lockAspectRatio, titleBar.height));
    }
  }, [
    autoSizing,
    blockAutoSizeRef,
    maximized,
    lockAspectRatio,
    stateSize,
    titleBar.height,
  ]);

  return [size, setSize];
};

export default useResizable;
