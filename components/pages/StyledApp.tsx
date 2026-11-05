import { type FeatureBundle, LazyMotion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { useThemeName } from "contexts/session";
import GlobalStyle from "styles/GlobalStyle";
import themes from "styles/themes";
import { ACCESSIBILITY_CHANGE_EVENT, readAccessibilityPreferences } from "utils/accessibility";
import { DEFAULT_THEME } from "utils/constants";

const motionFeatures = async (): Promise<FeatureBundle> =>
  (await import(/* webpackMode: "eager" */ "styles/motionFeatures")).default;

const StyledApp: FC = ({ children }) => {
  const themeName = useThemeName();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const updateMotionPreference = (): void => {
      setReduceMotion(readAccessibilityPreferences().reduceMotion);
    };
    updateMotionPreference();
    window.addEventListener(ACCESSIBILITY_CHANGE_EVENT, updateMotionPreference);
    return () => window.removeEventListener(ACCESSIBILITY_CHANGE_EVENT, updateMotionPreference);
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
