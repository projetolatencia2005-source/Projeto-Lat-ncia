import { type OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";
import {
  CLOCK_TEXT_HEIGHT_OFFSET,
  formatLocaleDateTime,
  type LocaleTimeDate,
} from "components/system/Taskbar/Clock/functions";
import { getNtpAdjustedTime } from "components/system/Taskbar/Clock/ntp";
import { type ClockSource } from "contexts/session/types";
import formats from "styles/defaultTheme/formats";

const MILLISECONDS_IN_SECOND = 1000;

const fontSize = "13.3333px";
const textColor = "#31302c";

let mode: ClockSource;
let offscreenCanvas: OffscreenCanvas;
let offscreenContext: OffscreenCanvasRenderingContext2D;

const getNow = (): Date =>
  !mode || mode === "local" ? new Date() : getNtpAdjustedTime();

const textPosition = {
  x: 0,
  y: 0,
};

const styleClock = (): void => {
  offscreenContext.scale(global.devicePixelRatio, global.devicePixelRatio);
  offscreenContext.fillStyle = textColor;
  offscreenContext.font = `400 ${fontSize} ${formats.systemFont}`;
  const trackedContext = offscreenContext as OffscreenCanvasRenderingContext2D & {
    letterSpacing?: string;
  };
  if ("letterSpacing" in trackedContext) trackedContext.letterSpacing = "-0.5px";
  offscreenContext.textAlign = "right";
  offscreenContext.textBaseline = "middle";

  textPosition.y =
    Math.floor(offscreenCanvas.height / global.devicePixelRatio / 2) +
    CLOCK_TEXT_HEIGHT_OFFSET;
  textPosition.x = Math.floor(
    offscreenCanvas.width / global.devicePixelRatio
  );
};

const drawClockText = (dateTime: LocaleTimeDate): void => {
  if (!offscreenContext) {
    offscreenContext = offscreenCanvas.getContext(
      "2d"
    ) as OffscreenCanvasRenderingContext2D;

    if (!offscreenContext) return;

    styleClock();
  }

  offscreenContext.clearRect(
    0,
    0,
    offscreenCanvas.width,
    offscreenCanvas.height
  );
  offscreenContext.fillText(dateTime.time, textPosition.x, textPosition.y);
};

const sendTick = (): void => {
  const dateTime = formatLocaleDateTime(getNow());

  globalThis.postMessage(dateTime);
  if (offscreenCanvas) drawClockText(dateTime);
};

const loadSilkscreenNumeralsFont = async (): Promise<void> => {
  const workerFonts = (
    globalThis as typeof globalThis & {
      fonts?: FontFaceSet;
    }
  ).fonts;

  if (!workerFonts || typeof FontFace === "undefined") return;

  try {
    const fontDescriptors: FontFaceDescriptors = {
      unicodeRange: "U+0030-0039",
      weight: "400",
    };
    const font = new FontFace(
      "Pixelify Sans",
      'url("/System/Doors/fonts/Silkscreen-Regular.ttf")',
      fontDescriptors
    );

    await font.load();
    workerFonts.add(font);

    if (offscreenCanvas) {
      styleClock();
      sendTick();
    }
  } catch {
    // Keep the clock available if the optional Silkscreen numerals cannot be loaded.
  }
};

// oxlint-disable-next-line unicorn/prefer-top-level-await -- Keep worker startup responsive while the optional font loads.
void loadPixelifySansFont();

let initialized = false;

globalThis.addEventListener(
  "message",
  ({ data }: { data: "init" | ClockSource | OffscreenRenderProps }) => {
    if (!initialized) {
      if (data === "init") {
        initialized = true;
        globalThis.postMessage("source");
      }
      return;
    }

    if (
      "OffscreenCanvas" in global &&
      (data as OffscreenRenderProps)?.devicePixelRatio
    ) {
      const { canvas, clockSize, devicePixelRatio } =
        data as OffscreenRenderProps;

      global.devicePixelRatio = devicePixelRatio;

      if (canvas instanceof OffscreenCanvas) {
        offscreenCanvas = canvas;
      }

      if (
        offscreenCanvas instanceof OffscreenCanvas &&
        clockSize?.height &&
        clockSize?.width &&
        devicePixelRatio
      ) {
        offscreenCanvas.height = Math.floor(
          Number(clockSize.height) * devicePixelRatio
        );
        offscreenCanvas.width = Math.floor(
          Number(clockSize.width) * devicePixelRatio
        );
        styleClock();
      }

      sendTick();

      return;
    }

    if (data === "local" || data === "ntp") mode = data;

    sendTick();
    globalThis.setTimeout(() => {
      sendTick();
      globalThis.setInterval(sendTick, MILLISECONDS_IN_SECOND);
    }, MILLISECONDS_IN_SECOND - new Date().getMilliseconds());
  },
  { passive: true }
);
