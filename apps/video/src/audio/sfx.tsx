import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import { SOUND_FILES } from "./const";
import type { SoundName } from "./sound-name";

interface SfxProps {
  sound: SoundName;
  at: number;
  volume: number;
}

/** A sound effect that starts `at` seconds into the current scene. */
export const Sfx = ({ sound, at, volume }: SfxProps) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence from={Math.round(at * fps)} layout="none" name={sound}>
      <Audio src={staticFile(SOUND_FILES[sound])} volume={volume} />
    </Sequence>
  );
};
