import { type FeatureBundle, LazyMotion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { useThemeName } from "contexts/session";
import GlobalStyle from "styles/GlobalStyle";
import themes from "styles/themes";
import { ACCESSIBILITY_CHANGE_EVENT, applyAccessibilityPreferences, readAccessibilityPreferences } from "utils/accessibility";
import { describeFocusedElement, speakScreenReader, stopScreenReader } from "utils/accessibilityReader";
import { DEFAULT_THEME } from "utils/constants";
import { installDoorsCursorStyles } from "utils/doorsCursor";

const motionFeatures = async (): Promise<FeatureBundle> =>
  (await import(/* webpackMode: "eager" */ "styles/motionFeatures")).default;

const StyledApp: FC = ({ children }) => {
  const themeName = useThemeName();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const screenReaderRate = useRef(1);

  useEffect(() => {
    const updateAccessibilityPreferences = (): void => {
      const preferences = readAccessibilityPreferences();
      applyAccessibilityPreferences(preferences);
      setReduceMotion(preferences.reduceMotion);
      setScreenReaderEnabled(preferences.screenReaderEnabled);
      screenReaderRate.current = preferences.screenReaderRate;
    };
    updateAccessibilityPreferences();
    window.addEventListener(ACCESSIBILITY_CHANGE_EVENT, updateAccessibilityPreferences);
    return () => window.removeEventListener(ACCESSIBILITY_CHANGE_EVENT, updateAccessibilityPreferences);
  }, []);

  useEffect(() => {
    if (!screenReaderEnabled) {
      stopScreenReader();
      return;
    }

    let focusTimer = 0;
    let liveTimer = 0;
    let lastLiveText = "";
    const scheduleSpeech = (text: string): void => {
      window.clearTimeout(focusTimer);
      focusTimer = window.setTimeout(() => {
        speakScreenReader(text, screenReaderRate.current);
      }, 100);
    };
    const onFocus = (event: FocusEvent): void => {
      const announcement = describeFocusedElement(event.target);
      if (announcement) scheduleSpeech(announcement);
    };
    const onChange = (event: Event): void => {
      const announcement = describeFocusedElement(event.target);
      if (announcement) scheduleSpeech(announcement);
    };
    const onLiveRegionChange = (records: MutationRecord[]): void => {
      records.forEach((record) => {
        const target = record.target instanceof Element
          ? record.target
          : record.target.parentElement;
        const liveRegion = target?.closest('[aria-live], [role="alert"], [role="status"]');
        if (!liveRegion || liveRegion.classList.contains("reader-status")) return;
        const text = liveRegion.textContent?.replace(/\s+/g, " ").trim() || "";
        if (!text || text === lastLiveText) return;
        lastLiveText = text;
        window.clearTimeout(liveTimer);
        liveTimer = window.setTimeout(() => speakScreenReader(text, screenReaderRate.current), 180);
      });
    };

    document.addEventListener("focusin", onFocus, true);
    document.addEventListener("change", onChange, true);
    const observer = new MutationObserver(onLiveRegionChange);
    if (document.body) observer.observe(document.body, { characterData: true, childList: true, subtree: true });

    const frameDocuments = new Map<HTMLIFrameElement, Document>();
    const attachFrame = (frame: HTMLIFrameElement): void => {
      try {
        const frameDocument = frame.contentDocument;
        if (frameDocument && !frameDocuments.has(frame)) {
          frameDocument.addEventListener("focusin", onFocus, true);
          frameDocument.addEventListener("change", onChange, true);
          frameDocuments.set(frame, frameDocument);
        }
      } catch {
        // Cross-origin content is outside the site and cannot be monitored.
      }
    };
    const attachFrames = (root: ParentNode): void => {
      root.querySelectorAll("iframe").forEach(attachFrame);
    };
    attachFrames(document);
    const frameObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLIFrameElement) attachFrame(node);
        if (node instanceof Element) attachFrames(node);
      }));
    });
    if (document.body) frameObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(liveTimer);
      document.removeEventListener("focusin", onFocus, true);
      document.removeEventListener("change", onChange, true);
      frameDocuments.forEach((frameDocument) => {
        frameDocument.removeEventListener("focusin", onFocus, true);
        frameDocument.removeEventListener("change", onChange, true);
      });
      observer.disconnect();
      frameObserver.disconnect();
      stopScreenReader();
    };
  }, [screenReaderEnabled]);

  useEffect(() => {
    installDoorsCursorStyles(document);
  }, []);

  return (
    <StyleSheetManager enableVendorPrefixes>
      <ThemeProvider theme={themes[themeName] || themes[DEFAULT_THEME]}>
        <GlobalStyle />
        <LazyMotion features={motionFeatures} strict>
          <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>{children}</MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default StyledApp;

