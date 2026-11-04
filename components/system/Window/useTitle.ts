import { useProcessesActions } from "contexts/process";
import processDirectory from "contexts/process/directory";
import { PROCESS_DELIMITER, SAVE_TITLE_CHAR } from "utils/constants";

type Title = {
  appendFileToTitle: (url: string, unSaved?: boolean) => void;
  prependFileToTitle: (
    url: string,
    unSaved?: boolean,
    withoutDash?: boolean
  ) => void;
};

const useTitle = (id: string): Title => {
  const { title } = useProcessesActions();
  const [pid] = id.split(PROCESS_DELIMITER);
  const { title: originalTitle } = processDirectory[pid] || {};
  const appTitle = pid === "Photos" ? "" : originalTitle;
  const appendFileToTitle = (url: string, unSaved?: boolean): void => {
    const appendedFile = url
      ? `${pid === "Photos" ? "" : " - "}${url}${unSaved ? ` ${SAVE_TITLE_CHAR}` : ""}`
      : "";

    title(id, `${appTitle}${appendedFile}`);
  };
  const prependFileToTitle = (
    url: string,
    unSaved?: boolean,
    withoutDash?: boolean
  ): void => {
    const prependedFile = url
      ? `${unSaved ? `${SAVE_TITLE_CHAR} ` : ""}${url}${
          pid === "Photos" ? "" : withoutDash ? " " : " - "
        }`
      : "";

    title(id, `${prependedFile}${appTitle}`);
  };

  return {
    appendFileToTitle,
    prependFileToTitle,
  };
};

export default useTitle;
