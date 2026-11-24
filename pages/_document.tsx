import NextDocument, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";
import { DEFAULT_LOCALE } from "utils/constants";

const withStyledComponents = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const { renderPage } = ctx;
  const sheet = new ServerStyleSheet();

  try {
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const { styles, ...initialProps } = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [styles, sheet.getStyleElement()],
    };
  } finally {
    sheet.seal();
  }
};

// eslint-disable-next-line react/prefer-function-component
class Document extends NextDocument {
  public static override async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return withStyledComponents(ctx);
  }

  public override render(): React.JSX.Element {
    return (
      <Html lang={DEFAULT_LOCALE}>
        <Head>
          <Script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                var isSplashTarget = function (target) {
                  return target instanceof Element && target.closest(".doors-splash-screen");
                };
                var requestStart = function (event) {
                  event.preventDefault();
                  event.stopImmediatePropagation();
                  window.__doorsSplashStartRequested = true;
                  window.dispatchEvent(new Event("doors-splash-start-requested"));
                };
                window.addEventListener("click", function (event) {
                  if (isSplashTarget(event.target)) requestStart(event);
                }, true);
                window.addEventListener("keydown", function (event) {
                  if (!document.querySelector(".doors-splash-screen")) return;
                  if (
                    event.key === "F11" ||
                    event.key === "F12" ||
                    event.code === "F11" ||
                    event.code === "F12" ||
                    event.key === "Tab" ||
                    event.key === "Shift" ||
                    event.key === "Control" ||
                    event.key === "Alt" ||
                    event.key === "Meta"
                  ) return;
                  requestStart(event);
                }, true);
              })();`,
            }}
            id="doors-splash-early-input"
            strategy="beforeInteractive"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
