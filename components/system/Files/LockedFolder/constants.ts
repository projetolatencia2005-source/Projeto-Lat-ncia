export const LOCKED_FOLDER_WORDS = [
  "Alfabetização",
  "Informação",
  "Saber oculto",
  "Fragmentos",
  "Cognição",
] as const;

export const LOCKED_FOLDER_QUIZ_KEYWORD = LOCKED_FOLDER_WORDS[0];
export const LOCKED_FOLDER_QUIZ_KEYWORDS = LOCKED_FOLDER_WORDS;

export const isLockedFolderEntry = (path: string, url: string): boolean =>
  [path, url].some((candidate) => {
    const normalizedPath = candidate
      .replace(/\\/g, "/")
      .replace(/\/+$/, "")
      .toLocaleLowerCase("pt-BR");

    return (
      normalizedPath.endsWith("/users/public/pasta trancada") ||
      normalizedPath.endsWith("/pasta trancada.url")
    );
  });
