import { useTheme } from "styled-components";
import { isPostItPath } from "components/apps/TinyMCE/functions";
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
} from "components/system/Window/RndWindow/rndDefaults";
import { type Size } from "components/system/Window/RndWindow/useResizable";
import { useProcess } from "contexts/process";
import { DEFAULT_WINDOW_SIZE } from "utils/constants";
import { pxToNum } from "utils/functions";

export const isCollapsedPostItSize = (
  url: string,
  size: Size | undefined,
  titleBarHeight: number
): boolean => {
  if (!isPostItPath(url) || !size) return false;

  return (
    pxToNum(size.width) <= MIN_WINDOW_WIDTH + 8 ||
    pxToNum(size.height) <= MIN_WINDOW_HEIGHT + titleBarHeight + 4
  );
};

const useDefaultSize = (id: string): Size => {
  const { defaultSize, url = "" } = useProcess(id);
  const {
    sizes: { titleBar },
  } = useTheme();

  if (isPostItPath(url)) {
    return { height: 275 + titleBar.height, width: 380 };
  }

  return defaultSize
    ? {
        height: Number(defaultSize.height) + titleBar.height,
        width: defaultSize.width,
      }
    : DEFAULT_WINDOW_SIZE;
};

export default useDefaultSize;
