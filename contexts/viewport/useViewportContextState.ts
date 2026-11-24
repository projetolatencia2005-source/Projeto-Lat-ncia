import { useEffect, useRef, useState } from "react";
import {
  type FullscreenDocument,
  type FullscreenElement,
  type NavigatorWithKeyboard,
  type ViewportContextState,
} from "contexts/viewport/types";
import { isFirefox, isSafari } from "utils/functions";

const enterFullscreen = async (
  element: FullscreenElement,
  options: FullscreenOptions
): Promise<void> => {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen(options);
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen(options);
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen(options);
    }
  } catch {
    // Ignore failure while entering fullscreen
  }
};

const exitFullscreen = async (): Promise<void> => {
  const fullscreenDocument = document as FullscreenDocument;

  try {
    if (fullscreenDocument.exitFullscreen) {
      await fullscreenDocument.exitFullscreen();
    } else if (fullscreenDocument.mozCancelFullScreen) {
      await fullscreenDocument.mozCancelFullScreen();
    } else if (fullscreenDocument.webkitExitFullscreen) {
      await fullscreenDocument.webkitExitFullscreen();
    }
  } catch {
    // Ignore failure while exiting fullscreen
  }
};

export const getFullscreenElement = (): Element | null => {
  const { mozFullScreenElement, webkitFullscreenElement } =
    document as FullscreenDocument;

  return (
    document.fullscreenElement ||
    mozFullScreenElement ||
    webkitFullscreenElement
  );
};

const releaseKeyboardLock = (): void => {
  try {
    (navigator as NavigatorWithKeyboard)?.keyboard?.unlock?.();
  } catch {
    // Ignore unsupported keyboard APIs
  }
};

const useViewportContextState = (): ViewportContextState => {
  const [fullscreenElement, setFullscreenElement] = useState<Element | null>(
    // 
    null
  );
  const restoreDesktopRef = useRef(false);
  const toggleFullscreen = async (
    element?: HTMLElement | null,
    navigationUI?: FullscreenNavigationUI
  ): Promise<void> => {
    // State can be stale, the document always knows what is in fullscreen
    const currentFullscreenElement = getFullscreenElement();

    if (
      currentFullscreenElement &&
      (!element || element === currentFullscreenElement)
    ) {
      await exitFullscreen();

      if (restoreDesktopRef.current) {
        restoreDesktopRef.current = false;
        await enterFullscreen(document.documentElement, {
          navigationUI: "hide",
        });
      }
    } else {
      // Only Chrome switches full screen elements without exiting
      const mustExit =
        Boolean(currentFullscreenElement) && (isFirefox() || isSafari());

      restoreDesktopRef.current =
        mustExit && currentFullscreenElement === document.documentElement;

      if (mustExit) await exitFullscreen();

      await enterFullscreen(element || document.documentElement, {
        navigationUI: navigationUI || "hide",
      });
    }
  };

  useEffect(() => {
    const onFullscreenChange = (): void => {
      releaseKeyboardLock();
      setFullscreenElement(getFullscreenElement());
    };
    const onFocusLoss = (): void => releaseKeyboardLock();
    const onVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") releaseKeyboardLock();
      setFullscreenElement(getFullscreenElement());
    };

    releaseKeyboardLock();
    document.addEventListener("fullscreenchange", onFullscreenChange, {
      passive: true,
    });
    document.addEventListener("visibilitychange", onVisibilityChange, {
      passive: true,
    });
    window.addEventListener("blur", onFocusLoss);
    window.addEventListener("pagehide", onFocusLoss);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onFocusLoss);
      window.removeEventListener("pagehide", onFocusLoss);
      releaseKeyboardLock();
    };
  }, []);

  return { fullscreenElement, toggleFullscreen };
};

export default useViewportContextState;
