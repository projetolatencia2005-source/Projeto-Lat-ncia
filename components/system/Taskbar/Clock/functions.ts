export type LocaleTimeDate = {
  date: string;
  time: string;
};

const DEFAULT_LOCALE = "pt-BR";

const dateFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
});

export const formatLocaleDateTime = (now: Date): LocaleTimeDate => {
  const date = dateFormatter.format(now);
  const time = timeFormatter.format(now);

  return {
    date,
    time,
  };
};

export const CLOCK_TEXT_HEIGHT_OFFSET = 1;
