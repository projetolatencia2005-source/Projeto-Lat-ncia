import { useState } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import {
  type AccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  readAccessibilityPreferences,
  saveAccessibilityPreferences,
} from "utils/accessibility";

type PreferenceKey = keyof AccessibilityPreferences;

const Accessibility: FC<ComponentProcessProps> = () => {
  const [preferences, setPreferences] = useState(readAccessibilityPreferences);
  const togglePreference = (key: PreferenceKey): void => {
    const nextPreferences = { ...preferences, [key]: !preferences[key] };
    setPreferences(nextPreferences);
    saveAccessibilityPreferences(nextPreferences);
  };
  const resetPreferences = (): void => {
    const defaults = { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
    setPreferences(defaults);
    saveAccessibilityPreferences(defaults);
  };

  return (
    <main aria-label="Opções de acessibilidade" className="doors-accessibility-panel">
      <header>
        <h1>Acessibilidade</h1>
        <p>Escolha ajustes para tornar o Doors mais confortável de usar.</p>
      </header>
      <section aria-label="Ajustes visuais" className="options">
        <label><input checked={preferences.highContrast} onChange={() => togglePreference("highContrast")} type="checkbox" />Reforçar contraste</label>
        <label><input checked={preferences.largeInterface} onChange={() => togglePreference("largeInterface")} type="checkbox" />Aumentar a interface</label>
        <label><input checked={preferences.reduceMotion} onChange={() => togglePreference("reduceMotion")} type="checkbox" />Reduzir animações</label>
      </section>
      <section aria-labelledby="doors-shortcuts-title" className="shortcuts">
        <h2 id="doors-shortcuts-title">Navegação por teclado</h2>
        <ul>
          <li><kbd>Shift</kbd> + <kbd>Esc</kbd>: abrir o Menu Iniciar</li>
          <li><kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>E</kbd>: Explorador de Arquivos</li>
          <li><kbd>Shift</kbd> + <kbd>F10</kbd>: Terminal</li>
          <li><kbd>F11</kbd>: tela cheia</li>
        </ul>
      </section>
      <button onClick={resetPreferences} type="button">Restaurar padrões</button>
    </main>
  );
};

export default Accessibility;
