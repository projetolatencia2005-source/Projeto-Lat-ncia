let systemVolume = 1;
const registeredMedia = new Set<HTMLMediaElement>();
const masterGains = new Set<GainNode>();
const patchedAudioNodePrototypes = new WeakSet<object>();
const routedAudioNodes = new WeakSet<AudioNode>();
const masterGainByContext = new WeakMap<BaseAudioContext, GainNode>();

/** Route Web Audio output through one adjustable master gain per context. */
export const installSystemAudioVolume = (
  targetWindow: Window & typeof globalThis
): void => {
  const audioNodePrototype = targetWindow.AudioNode?.prototype;

  if (!audioNodePrototype || patchedAudioNodePrototypes.has(audioNodePrototype))
    return;

  const nativeConnect = audioNodePrototype.connect;
  const nativeDisconnect = audioNodePrototype.disconnect;
  const patchedConnect = function (
    this: AudioNode,
    destination: AudioNode | AudioParam,
    output?: number,
    input?: number
  ): AudioNode | void {
    const args = Array.from(arguments) as (AudioNode | AudioParam | number)[];
    const context = this.context;

    if (
      destination === context.destination &&
      "createGain" in context &&
      targetWindow.AudioContext &&
      context instanceof targetWindow.AudioContext
    ) {
      let masterGain = masterGainByContext.get(context);

      if (!masterGain) {
        const newMasterGain = context.createGain();
        newMasterGain.gain.value = systemVolume;
        Reflect.apply(nativeConnect, newMasterGain, [context.destination]);
        masterGain = newMasterGain;
        masterGainByContext.set(context, newMasterGain);
        masterGains.add(newMasterGain);
        context.addEventListener("statechange", () => {
          if (context.state === "closed") masterGains.delete(newMasterGain);
        });
      }

      const routedArgs: (AudioNode | number)[] = [masterGain];
      if (args.length > 1) routedArgs.push(output ?? 0);
      if (args.length > 2) routedArgs.push(0);
      Reflect.apply(nativeConnect, this, routedArgs);
      routedAudioNodes.add(this);

      // AudioNode.connect returns the destination passed by the caller.
      return destination;
    }

    return Reflect.apply(nativeConnect, this, args);
  };
  const patchedDisconnect = function (
    this: AudioNode,
    destinationOrOutput?: AudioNode | AudioParam | number,
    output?: number,
    input?: number
  ): void {
    const args = Array.from(arguments) as (AudioNode | AudioParam | number)[];

    if (
      destinationOrOutput === this.context.destination &&
      routedAudioNodes.has(this)
    ) {
      const masterGain = masterGainByContext.get(this.context);

      if (masterGain) {
        args[0] = masterGain;
        if (args.length > 2) args[2] = 0;
      }
    }

    Reflect.apply(nativeDisconnect, this, args);
  };

  Object.defineProperty(audioNodePrototype, "connect", {
    configurable: true,
    value: patchedConnect,
    writable: true,
  });
  Object.defineProperty(audioNodePrototype, "disconnect", {
    configurable: true,
    value: patchedDisconnect,
    writable: true,
  });
  patchedAudioNodePrototypes.add(audioNodePrototype);
};

if (typeof window !== "undefined") installSystemAudioVolume(window);

export const getSystemVolume = (): number => systemVolume;

export const registerSystemMedia = (media: HTMLMediaElement): void => {
  registeredMedia.add(media);
  media.volume = systemVolume;
};

export const unregisterSystemMedia = (media: HTMLMediaElement): void => {
  registeredMedia.delete(media);
};

export const setSystemVolume = (volume: number): void => {
  systemVolume = Math.max(0, Math.min(1, volume));
  registeredMedia.forEach((media) => {
    media.volume = systemVolume;
  });
  masterGains.forEach((gain) => {
    gain.gain.value = systemVolume;
  });
};
