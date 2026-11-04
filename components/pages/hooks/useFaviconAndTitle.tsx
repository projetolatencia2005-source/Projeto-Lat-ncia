import { FAVICON_BASE_PATH, SITE_TITLE } from "utils/constants";

export const useFaviconAndTitle = (): {
  Favicon: null | React.JSX.Element;
  title: string;
} => ({
  Favicon: <link href={FAVICON_BASE_PATH} rel="icon" type="image/svg+xml" />,
  title: SITE_TITLE,
});