import { EXCLUDED_TAG_PREFIXES, EXCLUDED_TAGS } from './const.ts';

export const findExcludedTagReason = (tag: string) => {
  const prefix = Object.keys(EXCLUDED_TAG_PREFIXES).find((candidate) => tag.startsWith(candidate));
  return EXCLUDED_TAGS[tag] ?? (prefix === undefined ? undefined : EXCLUDED_TAG_PREFIXES[prefix]);
};
