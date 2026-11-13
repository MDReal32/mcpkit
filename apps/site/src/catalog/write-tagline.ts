import { MAX_TAGLINE_LENGTH } from "./const";

/** The first sentence of a registry description, cut at a word when it is still too long for a card. */
export const writeTagline = (description: string) => {
  const sentence = description.split(/(?<=[.!?])\s/)[0]?.trim() ?? "";
  if (sentence.length <= MAX_TAGLINE_LENGTH) {
    return sentence;
  }
  const cut = sentence.slice(0, MAX_TAGLINE_LENGTH).replace(/\s+\S*$/, "");
  return `${cut}…`;
};
