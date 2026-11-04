export const SITE_URLS = {
  bubble: "https://bubble.br/",
  encicloweb: "https://encicloweb.br/",
  gluugli: "https://gluugli.local/",
  youspace: "https://youspace.com/",
} as const;

export type InternalSiteId = keyof typeof SITE_URLS;

export type InternalSite = {
  id: InternalSiteId;
  title: string;
  url: string;
};

export const INTERNAL_SITES: InternalSite[] = [
  { id: "gluugli", title: "Gluugli", url: SITE_URLS.gluugli },
  { id: "bubble", title: "Bubble", url: SITE_URLS.bubble },
  { id: "encicloweb", title: "EncicloWeb", url: SITE_URLS.encicloweb },
  { id: "youspace", title: "YouSpace", url: SITE_URLS.youspace },
];

export const HOME_PAGE = SITE_URLS.gluugli;

const hostToSite: Record<string, InternalSiteId> = {
  "bubble.br": "bubble",
  "encicloweb.br": "encicloweb",
  "gluugli.local": "gluugli",
  "youspace.com": "youspace",
};

export const getInternalSite = (url: string): InternalSite | undefined => {
  try {
    const siteId = hostToSite[new URL(url).hostname.toLowerCase()];

    return INTERNAL_SITES.find(({ id }) => id === siteId);
  } catch {
    return undefined;
  }
};

export const normalizeInternalUrl = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) return HOME_PAGE;

  const alias = /^(gluugli|bubble|encicloweb|wiki|youspace)(\/.*)?$/i.exec(
    trimmed
  );

  if (alias) {
    const aliasToSite: Record<string, InternalSiteId> = {
      bubble: "bubble",
      encicloweb: "encicloweb",
      gluugli: "gluugli",
      wiki: "encicloweb",
      youspace: "youspace",
    };
    const site = INTERNAL_SITES.find(
      ({ id }) => id === aliasToSite[alias[1].toLowerCase()]
    );

    return `${site?.url}${alias[2]?.replace(/^\//, "") || ""}`;
  }

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    const siteId = hostToSite[parsed.hostname.toLowerCase()];

    if (siteId) {
      return `${SITE_URLS[siteId].replace(/\/$/, "")}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    // Unrecognized input becomes a local Gluugli search.
  }

  return `${SITE_URLS.gluugli}search?q=${encodeURIComponent(trimmed)}`;
};

export const getSiteTitle = (url: string): string =>
  getInternalSite(url)?.title || "Gluugli";
