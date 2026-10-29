import { Audio } from "@remotion/media";
import { getStaticFiles } from "@remotion/studio";
import { staticFile } from "remotion";
import { VOICE_DIR } from "../voiceover/const";

/** The score from `scripts/audio`, sitting lower when there is narration over it. */
export const Music = () => {
  const narrated = getStaticFiles().some((file) => file.name.startsWith(`${VOICE_DIR}/`));
  return <Audio src={staticFile("audio/music.wav")} volume={narrated ? 0.3 : 0.5} />;
};
