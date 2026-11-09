import { basename, dirname, extname, join } from "path";
import { type SyntheticEvent, useEffect, useState } from "react";
import StyledPhotos from "components/apps/Photos/StyledPhotos";
import usePanZoom, { panZoomConfig } from "components/apps/Photos/usePanZoom";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import useTitle from "components/system/Window/useTitle";
import useWindowSize from "components/system/Window/useWindowSize";
import { useFileSystemActions } from "contexts/fileSystem";
import { useProcess, useProcessesActions } from "contexts/process";
import useDoubleClick from "hooks/useDoubleClick";
import {
  HIGH_PRIORITY_ELEMENT,
  IMAGE_FILE_EXTENSIONS,
  NATIVE_IMAGE_FORMATS,
} from "utils/constants";
import {
  bufferToUrl,
  getExtension,
  getMimeType,
  haltEvent,
} from "utils/functions";
import { loadImageDecoder } from "utils/loaders";

const { minScale, step } = panZoomConfig;

const ZOOM_KEYS = new Set(["-", "+", "="]);

// Like Photos, a zoomed in photo moves the opposite way of the arrow key
const PAN_STEPS: Record<string, [number, number]> = {
  ArrowDown: [0, -1],
  ArrowLeft: [1, 0],
  ArrowRight: [-1, 0],
  ArrowUp: [0, 1],
};

const Photos: FC<ComponentProcessProps> = ({ id }) => {
  const { url: setUrl } = useProcessesActions();
  const { closing = false, componentWindow, url = "" } = useProcess(id);
  const [src, setSrc] = useState<Record<string, string>>({});
  const [brokenImage, setBrokenImage] = useState(false);
  const { prependFileToTitle } = useTitle(id);
  const { readdir, readFile } = useFileSystemActions();
  const [container, setContainer] = useState<HTMLDivElement | null>();
  const [image, setImage] = useState<HTMLImageElement | null>();
  const [imageContainer, setImageContainer] = useState<HTMLElement | null>();
  const { updateWindowSize } = useWindowSize(id);
  const { pan, reset, scale, zoomIn, zoomOut, zoomToPoint } = usePanZoom(
    id,
    image,
    imageContainer
  );
  const loadPhoto = async (): Promise<void> => {
    const ext = getExtension(url);
    const isNative = NATIVE_IMAGE_FORMATS.has(ext);
    const [initialContents, decoder] = await Promise.all([
      readFile(url),
      isNative
        ? Promise.resolve()
        : loadImageDecoder().then((m) => m.decodeImageToBuffer),
    ]);
    let fileContents = initialContents;

    if (!isNative && decoder) {
      const decodedData = await decoder(ext, fileContents);

      if (decodedData) fileContents = decodedData;
    }

    setSrc((currentSrc) => {
      const [currentUrl] = Object.keys(currentSrc);

      if (currentUrl) {
        if (currentUrl === url) return currentSrc;
        reset?.();
      }

      return {
        [url]: bufferToUrl(fileContents, getMimeType(url)),
      };
    });
    prependFileToTitle(basename(url));
  };
  const movePhoto = async (direction: -1 | 1): Promise<void> => {
    const directory = await readdir(dirname(url));
    const currentIndex = directory.indexOf(basename(url));

    if (currentIndex === -1) return;

    for (
      let nextIndex = currentIndex + direction;
      nextIndex >= 0 && nextIndex < directory.length;
      nextIndex += direction
    ) {
      const nextUrl = directory[nextIndex];

      if (IMAGE_FILE_EXTENSIONS.has(getExtension(nextUrl))) {
        setUrl(id, join(dirname(url), nextUrl));
        return;
      }
    }
  };
  const onKeyDown = async (event: KeyboardEvent): Promise<void> => {
    const { altKey, ctrlKey, key, metaKey } = event;
    const panStep = PAN_STEPS[key];

    // Like the zoom buttons, while Ctrl is left for browser zoom
    if (
      url &&
      !brokenImage &&
      !altKey &&
      !ctrlKey &&
      !metaKey &&
      ZOOM_KEYS.has(key)
    ) {
      haltEvent(event);
      if (key === "-") zoomOut?.();
      else zoomIn?.();
      return;
    }

    // Zoom steps can leave the scale a hair above its minimum
    if (panStep && scale && scale >= minScale + step) {
      const [stepX, stepY] = panStep;
      // Panning is scaled by the zoom, so a step is a tenth of the view
      const distance = (container?.clientWidth || 0) / 10 / scale;

      haltEvent(event);
      pan?.(stepX * distance, stepY * distance, { relative: true });
      return;
    }

    if (key === "ArrowRight" || key === "ArrowLeft") {
      await movePhoto(key === "ArrowRight" ? 1 : -1);
    }
  };
  const onImageLoad = ({
    currentTarget,
  }: SyntheticEvent<HTMLImageElement>): void => {
    setBrokenImage(false);
    updateWindowSize(currentTarget.naturalHeight, currentTarget.naturalWidth);
  };

  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect -- False positive: state is only set after an await
    if (url && !src[url] && !closing) loadPhoto();
  }, [closing, loadPhoto, src, url]);

  useEffect(() => {
    componentWindow?.addEventListener("keydown", onKeyDown);

    return () => componentWindow?.removeEventListener("keydown", onKeyDown);
  }, [componentWindow, onKeyDown]);

  return (
    <StyledPhotos
      ref={setContainer}
      $showImage={Boolean(src[url] && !brokenImage)}
      className={url ? "" : "drop"}
      onContextMenu={haltEvent}
      {...useFileDrop({ id })}
    >
      <figure
        ref={setImageContainer}
        {...useDoubleClick((event) => {
          if (scale === minScale) {
            zoomToPoint?.(minScale * 2, event, { animate: true });
          } else {
            reset?.();
          }
        })}
      >
        <img
          ref={setImage}
          alt={basename(url, extname(url))}
          decoding="async"
          loading="eager"
          onError={() => setBrokenImage(true)}
          onLoad={onImageLoad}
          src={src[url]}
          {...HIGH_PRIORITY_ELEMENT}
        />
        {brokenImage && (
          <div>
            {basename(url)}
            <br />
            Sorry, Photos can&apos;t open this file because the format is
            currently unsupported, or the file is corrupted
          </div>
        )}
      </figure>
      {url && !brokenImage && src[url] && (
        <>
          <button
            aria-label="Imagem anterior"
            className="doors-photo-nav doors-photo-nav-previous"
            onClick={() => void movePhoto(-1)}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              draggable={false}
              src="/System/Doors/Esquerda.svg"
            />
          </button>
          <button
            aria-label="Próxima imagem"
            className="doors-photo-nav doors-photo-nav-next"
            onClick={() => void movePhoto(1)}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              draggable={false}
              src="/System/Doors/Direita.svg"
            />
          </button>
        </>
      )}
    </StyledPhotos>
  );
};

export default Photos;
