import {
  type WallpaperFunc,
  type WallpaperMenuItem,
} from "components/system/Desktop/Wallpapers/types";
import { type WallpaperFit } from "contexts/session/types";

export const bgPositionSize: Record<WallpaperFit, string> = {
  center: "center center",
  fill: "center center / cover",
  fit: "center center / contain",
  stretch: "center center / 100% 100%",
  tile: "50% 50%",
};

export const WALLPAPER_PATHS: Record<
  string,
  () => Promise<{ default: WallpaperFunc; libs?: string[] }>
> = {
  COASTAL_LANDSCAPE: () =>
    import("components/system/Desktop/Wallpapers/ShaderToy/CoastalLandscape"),
  GALAXY: () => import("components/system/Desktop/Wallpapers/Galaxy"),
  HEXELLS: () => import("components/system/Desktop/Wallpapers/hexells"),
  MATRIX: () => import("components/system/Desktop/Wallpapers/Matrix"),
  STABLE_DIFFUSION: () =>
    import("components/system/Desktop/Wallpapers/StableDiffusion"),
  VANTA: () => import("components/system/Desktop/Wallpapers/vantaWaves"),
};

export const WALLPAPER_WORKERS: Record<string, () => Worker> = {
  COASTAL_LANDSCAPE: (): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/ShaderToy/CoastalLandscape/wallpaper.worker",
        import.meta.url
      ),
      { name: "Wallpaper (Coastal Landscape)" }
    ),
  GALAXY: (): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/Galaxy/wallpaper.worker",
        import.meta.url
      ),
      { name: "Wallpaper (Galaxy)" }
    ),
  HEXELLS: (): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/hexells/wallpaper.worker",
        import.meta.url
      ),
      { name: "Wallpaper (Hexells)" }
    ),
  STABLE_DIFFUSION: (): Worker =>
    new Worker(
      new URL("components/apps/StableDiffusion/sd.worker", import.meta.url),
      { name: "Wallpaper (Stable Diffusion)" }
    ),
  VANTA: (): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/vantaWaves/wallpaper.worker",
        import.meta.url
      ),
      { name: "Wallpaper (Vanta Waves)" }
    ),
};

export const WALLPAPER_WORKER_NAMES = Object.keys(WALLPAPER_WORKERS);

export const REDUCED_MOTION_PERCENT = 0.1;

export const WALLPAPER_MENU: WallpaperMenuItem[] = [
  { id: "ART_INSTITUTE_OF_CHICAGO", name: "Plano de fundo padrão" },
  { id: "PAISAGEM_02", name: "Paisagem 02" },
  { id: "PAISAGEM_03", name: "Paisagem 03" },
  { id: "PAISAGEM_04", name: "Paisagem 04" },
  {
    id: "MATRIX 2D",
    name: "Matrix (2D)",
  },
];

export const BASE_CANVAS_SELECTOR = ":scope > canvas:not(#desktop-fly)";

export const BASE_VIDEO_SELECTOR = ":scope > video";

export const STABLE_DIFFUSION_DELAY_IN_MIN = 10;

export const PRELOAD_ID = "preloadWallpaper";

export const MAX_RETRIES = 5;
