const MAX_READER_TEXT_LENGTH = 10000;

export const isScreenReaderSupported = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.speechSynthesis !== "undefined" &&
  typeof SpeechSynthesisUtterance !== "undefined";

export const stopScreenReader = (): void => {
  if (isScreenReaderSupported()) window.speechSynthesis.cancel();
};

export const speakScreenReader = (text: string, rate = 1): boolean => {
  const normalizedText = text.replace(/\s+/g, " ").trim().slice(0, MAX_READER_TEXT_LENGTH);
  if (!normalizedText || !isScreenReaderSupported()) return false;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(normalizedText);
  utterance.lang = "pt-BR";
  utterance.rate = Math.min(1.5, Math.max(0.7, rate));
  window.speechSynthesis.speak(utterance);
  return true;
};

const getElementName = (element: HTMLElement): string => {
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel.trim();

  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const labels = labelledBy
      .split(/\s+/)
      .map((id) => element.ownerDocument.getElementById(id)?.textContent?.trim())
      .filter(Boolean);
    if (labels.length) return labels.join(" ");
  }

  const input = element as HTMLInputElement;
  if ("labels" in element && input.labels?.length) {
    const label = Array.from(input.labels)
      .map((item) => item.innerText.trim())
      .filter(Boolean)
      .join(" ");
    if (label) return label;
  }

  const parentLabel = element.closest("label")?.innerText.trim();
  if (parentLabel) return parentLabel;

  const content = element.innerText?.trim();
  return (
    content ||
    element.getAttribute("alt") ||
    element.getAttribute("title") ||
    element.getAttribute("placeholder") ||
    ""
  ).trim();
};

const getRoleName = (element: HTMLElement): string => {
  const role = element.getAttribute("role");
  if (role) {
    const roleNames: Record<string, string> = {
      button: "botão",
      checkbox: "caixa de seleção",
      combobox: "lista",
      link: "link",
      menuitem: "item de menu",
      radio: "opção",
      slider: "controle deslizante",
      textbox: "campo de texto",
    };
    return roleNames[role] || role;
  }

  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") return "botão";
  if (tagName === "a") return "link";
  if (tagName === "textarea" || element.isContentEditable) return "campo de texto";
  if (tagName === "select") return "lista";
  if (tagName === "input") {
    const type = (element as HTMLInputElement).type;
    if (type === "checkbox") return "caixa de seleção";
    if (type === "radio") return "opção";
    if (type === "range") return "controle deslizante";
    return "campo de texto";
  }
  return "";
};

export const describeFocusedElement = (target: EventTarget | null): string => {
  if (!target || typeof target !== "object" || !("tagName" in target)) return "";
  const element = target as HTMLElement;
  if (element.closest('[aria-hidden="true"], [inert]')) return "";

  const name = getElementName(element);
  if (!name) return "";

  const role = getRoleName(element);
  const details: string[] = [];
  if (role) details.push(role);

  if (element.matches('input[type="checkbox"], [role="checkbox"]')) {
    const checked =
      element.getAttribute("aria-checked") === "true" ||
      (element as HTMLInputElement).checked;
    details.push(checked ? "marcada" : "desmarcada");
  } else if (element.matches('input[type="radio"], [role="radio"]')) {
    const checked =
      element.getAttribute("aria-checked") === "true" ||
      (element as HTMLInputElement).checked;
    details.push(checked ? "selecionada" : "não selecionada");
  } else if (element.matches('input[type="range"], [role="slider"]')) {
    const value =
      element.getAttribute("aria-valuetext") ||
      element.getAttribute("value") ||
      (element as HTMLInputElement).value;
    if (value) details.push("valor " + value);
  } else if (element.tagName.toLowerCase() === "select") {
    const selected = (element as HTMLSelectElement).selectedOptions[0]?.textContent?.trim();
    if (selected) details.push("selecionado " + selected);
  }

  if (element.getAttribute("aria-expanded") === "true") details.push("expandido");
  if (element.getAttribute("aria-expanded") === "false") details.push("recolhido");
  if ((element as HTMLButtonElement).disabled) details.push("indisponível");

  return [name, ...details].join(". ") + ".";
};

const getWindowText = (container: HTMLElement): string => {
  const parts = [container.getAttribute("aria-label") || "", container.innerText || ""];

  container.querySelectorAll("iframe").forEach((frame) => {
    try {
      const frameText = frame.contentDocument?.body?.innerText;
      if (frameText) parts.push(frameText);
    } catch {
      // Cross-origin frames cannot be read; the surrounding browser controls remain available.
    }
  });

  return parts.join(" ").replace(/\s+/g, " ").trim();
};

const getWindowLayer = (element: HTMLElement): number => {
  let current: HTMLElement | null = element;
  while (current && current !== document.documentElement) {
    const zIndex = window.getComputedStyle(current).zIndex;
    if (zIndex !== "auto") return Number.parseInt(zIndex, 10) || 0;
    current = current.parentElement;
  }
  return 0;
};

export const getForegroundWindowText = (): string => {
  if (typeof document === "undefined") return "";

  const windows = Array.from(
    document.querySelectorAll<HTMLElement>('section[role="dialog"][aria-label]'),
  )
    .filter((element) => {
      if (element.closest(".doors-accessibility-panel")) return false;
      if (element.closest('[aria-hidden="true"], [inert]')) return false;
      const bounds = element.getBoundingClientRect();
      return bounds.width > 0 && bounds.height > 0;
    })
    .sort((first, second) => getWindowLayer(second) - getWindowLayer(first));

  const desktop =
    document.querySelector<HTMLElement>('[aria-label="Área de trabalho do Doors"]');
  const content = windows[0] || desktop || document.querySelector("main") || document.body;
  return content ? getWindowText(content) : "";
};
