import { useCallback } from "react";
import { SOUNDS_PATHS } from "../sound-constants";
import { TSound } from "../sounds-types";
import { useAudioPlayer, useAudioPlayerContext } from "react-use-audio-player";

export function useSound() {
  const { load: loadLooping, stop } = useAudioPlayerContext();
  const { load } = useAudioPlayer();

  const playLoopSound = useCallback(
    (soundType: TSound) => {
      loadLooping(SOUNDS_PATHS[soundType], {
        initialVolume: 0.5,
        autoplay: true,
        loop: true,
      });
    },
    [loadLooping],
  );

  const stopLoopSound = useCallback(() => {
    stop();
  }, [stop]);

  const playSound = useCallback(
    (soundType: TSound) => {
      load(SOUNDS_PATHS[soundType], {
        initialVolume: 0.5,
        autoplay: true,
        loop: false,
      });
    },
    [load],
  );

  return { playLoopSound, playSound, stopLoopSound };
}
