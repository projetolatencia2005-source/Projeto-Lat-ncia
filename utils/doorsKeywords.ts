const KEYWORD_STORAGE_KEY = "doors-keywords-collected-v1";

const normalizeKeyword = (keyword: string): string =>
  keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("pt-BR");

const readCollectedKeywords = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(KEYWORD_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
};

export const getDoorsCollectedKeywords = (): string[] => readCollectedKeywords();

export const isDoorsKeywordCollected = (keyword: string): boolean => {
  const normalized = normalizeKeyword(keyword);
  return readCollectedKeywords().some((item) => normalizeKeyword(item) === normalized);
};

export const recordDoorsKeyword = (keyword: string): boolean => {
  if (typeof window === "undefined") return false;
  const label = keyword.trim();
  const normalized = normalizeKeyword(label);
  const collected = readCollectedKeywords();
  if (!label || collected.some((item) => normalizeKeyword(item) === normalized)) return false;
  try {
    window.localStorage.setItem(KEYWORD_STORAGE_KEY, JSON.stringify([...collected, label]));
  } catch {
    return false;
  }
  window.dispatchEvent(new CustomEvent("doors-keyword-collected", { detail: { keyword: label } }));
  return true;
};
