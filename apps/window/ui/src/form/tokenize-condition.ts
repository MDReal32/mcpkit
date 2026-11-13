import { CONDITION_TOKEN_PATTERN } from "./const";

/** The tokens of a version condition, like the server reads them; throws on anything else. */
export const tokenizeCondition = (text: string) => {
  const tokens: string[] = [];
  const pattern = new RegExp(CONDITION_TOKEN_PATTERN);
  let index = 0;
  while (text.slice(index).trim() !== "") {
    pattern.lastIndex = index;
    const match = pattern.exec(text);
    if (match?.[1] === undefined) {
      throw new Error(`"${text}" is not a version condition`);
    }
    tokens.push(match[1]);
    index = pattern.lastIndex;
  }
  return tokens;
};
