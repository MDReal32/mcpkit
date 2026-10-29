/** Scales every channel by the same factor so the loudest sample reaches `peak`. */
export const normalize = (channels: readonly Float32Array[], peak: number) => {
  let loudest = 0;
  for (const channel of channels) {
    for (const sample of channel) {
      loudest = Math.max(loudest, Math.abs(sample));
    }
  }
  if (loudest === 0) {
    throw new Error("Cannot normalize silence");
  }
  const gain = peak / loudest;
  for (const channel of channels) {
    for (let index = 0; index < channel.length; index++) {
      channel[index] = (channel[index] ?? 0) * gain;
    }
  }
  return channels;
};
