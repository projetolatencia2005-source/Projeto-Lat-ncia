import { useTheme } from "styled-components";
import { isPostItPath } from "components/apps/TinyMCE/functions";
import { type Size } from "components/system/Window/RndWindow/useResizable";
import { useProcess } from "contexts/process";
import { DEFAULT_WINDOW_SIZE } from "utils/constants";

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
