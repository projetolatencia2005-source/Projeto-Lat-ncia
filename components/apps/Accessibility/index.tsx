import { useState } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import {
  type AccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  readAccessibilityPreferences,
  saveAccessibilityPreferences,
} from "utils/accessibility";
import {
  getForegroundWindowText,
  isScreenReaderSupported,
  speakScreenReader,
  stopScreenReader,
} from "utils/accessibilityReader";

type TogglePreferenceKey = "highContrast" | "largeInterface" | "reduceMotion";

const Accessibility: FC<ComponentProcessProps> = () => {
  const [preferences, setPreferences] = useState(readAccessibilityPreferences);
  const [readerSupported] = useState(isScreenReaderSupported);
  const [readerStatus, setReaderStatus] = useState("");
  const togglePreference = (key: TogglePreferenceKey): void => {
    const nextPreferences: AccessibilityPreferences = {
      ...preferences,
      [key]: !preferences[key],
    };
    setPreferences(nextPreferences);
    saveAccessibilityPreferences(nextPreferences);
  };
  const toggleScreenReader = (): void => {
    if (!readerSupported) {
      setReaderStatus("A leitura por voz não está disponível neste navegador.");
      return;
    }
    const enabled = !preferences.screenReaderEnabled;
    const nextPreferences = { ...preferences, screenReaderEnabled: enabled };
    setPreferences(nextPreferences);
    saveAccessibilityPreferences(nextPreferences);
    if (enabled) {
      speakScreenReader("Leitor de tela ativado.", preferences.screenReaderRate);
      setReaderStatus("Leitor de tela ativado.");
    } else {
      stopScreenReader();
      setReaderStatus("Leitor de tela desativado.");
    }
  };
  const updateReaderRate = (value: number): void => {
    const nextPreferences = { ...preferences, screenReaderRate: value };
    setPreferences(nextPreferences);
    saveAccessibilityPreferences(nextPreferences);
  };
  const readWindow = (): void => {
    if (!readerSupported) {
      setReaderStatus("A leitura por voz não está disponível neste navegador.");
      return;
    }
    const text = getForegroundWindowText();
    if (!text) {
      setReaderStatus("Não encontrei texto para ler nesta tela.");
      return;
    }
    const started = speakScreenReader(text, preferences.screenReaderRate);
    setReaderStatus(started ? "Lendo a janela aberta." : "Não foi possível iniciar a leitura.");
  };
  const resetPreferences = (): void => {
    const defaults = { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
    setPreferences(defaults);
    saveAccessibilityPreferences(defaults);
    stopScreenReader();
    setReaderStatus("Opções restauradas.");
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
      <section aria-labelledby="doors-reader-title" className="reader">
        <h2 id="doors-reader-title">Leitor de tela</h2>
        <p>Quando ativo, lê os controles ao receberem foco. Use “Ler janela aberta” para ouvir o conteúdo da janela em primeiro plano.</p>
        <label>
          <input
            checked={preferences.screenReaderEnabled}
            disabled={!readerSupported}
            onChange={toggleScreenReader}
            type="checkbox"
          />
          Ativar leitor de tela
        </label>
        <label className="reader-rate">
          Velocidade da voz
          <input
            aria-label="Velocidade da voz"
            disabled={!readerSupported}
            max="1.5"
            min="0.7"
            onChange={(event) => updateReaderRate(Number(event.currentTarget.value))}
            step="0.05"
            type="range"
            value={preferences.screenReaderRate}
          />
          <output>{preferences.screenReaderRate.toFixed(2)}×</output>
        </label>
        <div className="reader-controls">
          <button disabled={!readerSupported} onClick={readWindow} type="button">Ler janela aberta</button>
          <button disabled={!readerSupported} onClick={() => {
            stopScreenReader();
            setReaderStatus("Leitura interrompida.");
          }} type="button">Parar leitura</button>
        </div>
        <p className="reader-status" role="status">{readerStatus || (readerSupported ? "Voz em português do Brasil." : "Seu navegador não oferece leitura por voz.")}</p>
      </section>
      <section aria-labelledby="doors-shortcuts-title" className="shortcuts">
        <h2 id="doors-shortcuts-title">Navegação por teclado</h2>
        <ul>
          <li><kbd>Tab</kbd> e <kbd>Shift</kbd> + <kbd>Tab</kbd>: mover o foco</li>
          <li><kbd>Enter</kbd> ou <kbd>Espaço</kbd>: ativar o controle focado</li>
          <li><kbd>Esc</kbd>: fechar o menu ou a janela aberta</li>
        </ul>
      </section>
      <button onClick={resetPreferences} type="button">Restaurar padrões</button>
    </main>
  );
};

export default Accessibility;
