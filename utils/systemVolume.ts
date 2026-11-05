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
    {return;}

  const nativeConnect = audioNodePrototype.connect;
  const nativeDisconnect = audioNodePrototype.disconnect;
  const patchedConnect = function  patchedConnect(
    this: AudioNode,
    destination: AudioNode | AudioParam,
    ...optionalArgs: (AudioNode | AudioParam | number)[]
  ): AudioNode | void {
    const args = [destination, ...optionalArgs];
    const {context} = this;

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
      if (optionalArgs.length > 0) {
        routedArgs.push((optionalArgs[0] as number | undefined) ?? 0);
      }
      if (args.length > 2) routedArgs.push(0);
      Reflect.apply(nativeConnect, this, routedArgs);
      routedAudioNodes.add(this);

      // AudioNode.connect returns the destination passed by the caller.
      return destination;
    }

    return Reflect.apply(nativeConnect, this, args) as AudioNode | void;
  };
  const patchedDisconnect = function  patchedDisconnect(
    this: AudioNode,
    ...args: (AudioNode | AudioParam | number)[]
  ): void {
    const destinationOrOutput = args[0];
    let nativeArgs = args;

    if (
      destinationOrOutput === this.context.destination &&
      routedAudioNodes.has(this)
    ) {
      const masterGain = masterGainByContext.get(this.context);

      if (masterGain) {
        nativeArgs = [...args];
        nativeArgs[0] = masterGain;
        if (nativeArgs.length > 2) nativeArgs[2] = 0;
      }
    }

    Reflect.apply(nativeDisconnect, this, nativeArgs);
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
