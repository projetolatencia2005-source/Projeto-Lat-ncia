const WINDOW_SOUNDS = {
  open: "/System/Doors/audio/Som_06_AbrindoJanela.mp3",
  close: "/System/Doors/audio/Som_07_FechandoJanela.mp3",
} as const;

export type WindowSound = keyof typeof WINDOW_SOUNDS;

export const playWindowSound = (sound: WindowSound): void => {
  if (typeof window === "undefined") return;

  const audio = new Audio(WINDOW_SOUNDS[sound]);
  audio.volume = 0.72;
  void audio.play().catch(() => undefined);
};
