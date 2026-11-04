export type AccessibilityPreferences = {
  highContrast: boolean;
  largeInterface: boolean;
  reduceMotion: boolean;
};

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  highContrast: false,
  largeInterface: false,
  reduceMotion: false,
};

export const ACCESSIBILITY_CHANGE_EVENT = "doors-accessibility-change";
const STORAGE_KEY = "doors:accessibility";

export const readAccessibilityPreferences = (): AccessibilityPreferences => {
  if (typeof window === "undefined") return DEFAULT_ACCESSIBILITY_PREFERENCES;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const saved = stored ? (JSON.parse(stored) as Partial<AccessibilityPreferences>) : {};
    return {
      highContrast: saved.highContrast === true,
      largeInterface: saved.largeInterface === true,
      reduceMotion: saved.reduceMotion === true,
    };
  } catch {
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
  }
};

export const applyAccessibilityPreferences = (preferences: AccessibilityPreferences): void => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("doors-high-contrast", preferences.highContrast);
  document.documentElement.classList.toggle("doors-large-interface", preferences.largeInterface);
  document.documentElement.classList.toggle("doors-reduced-motion", preferences.reduceMotion);
};

export const saveAccessibilityPreferences = (preferences: AccessibilityPreferences): void => {
  applyAccessibilityPreferences(preferences);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new Event(ACCESSIBILITY_CHANGE_EVENT));
  } catch {
    // The visible controls remain usable when storage is unavailable.
  }
};
