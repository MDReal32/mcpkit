import { SAMPLE_RATE } from "../const.ts";

/** 16-bit PCM WAV with the channels interleaved. */
export const encodeWav = (channels: readonly Float32Array[]) => {
  const frames = channels[0]?.length ?? 0;
  const bytesPerFrame = channels.length * 2;
  const buffer = Buffer.alloc(44 + frames * bytesPerFrame);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + frames * bytesPerFrame, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels.length, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * bytesPerFrame, 28);
  buffer.writeUInt16LE(bytesPerFrame, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(frames * bytesPerFrame, 40);
  for (let frame = 0; frame < frames; frame++) {
    channels.forEach((channel, index) => {
      const sample = Math.max(-1, Math.min(1, channel[frame] ?? 0));
      buffer.writeInt16LE(Math.round(sample * 32767), 44 + frame * bytesPerFrame + index * 2);
    });
  }
  return buffer;
};
