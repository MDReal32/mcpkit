import { Audio } from "@remotion/media";
import { getStaticFiles } from "@remotion/studio";
import { Sequence, useVideoConfig } from "remotion";
import { VOICE_DIR, VOICE_LINES } from "./const";
import type { VoiceLineData } from "./voice-line-data";

interface VoiceLineProps {
  scene: VoiceLineData["scene"];
}

/** Plays the scene's narration if `yarn voiceover` has generated it; the video renders without it otherwise. */
export const VoiceLine = ({ scene }: VoiceLineProps) => {
  const { fps } = useVideoConfig();
  const line = VOICE_LINES.find((candidate) => candidate.scene === scene);
  const file = getStaticFiles().find((staticFile) => staticFile.name === `${VOICE_DIR}/${scene}.mp3`);
  if (!line || !file) {
    return null;
  }
  return (
    <Sequence from={Math.round(line.at * fps)} layout="none" name={`Voice: ${line.text}`}>
      <Audio src={file.src} volume={1} />
    </Sequence>
  );
};
