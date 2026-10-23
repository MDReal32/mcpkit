import { MAX_DESCRIPTION_LENGTH } from './const.ts';

export const cleanDescription = (text: string | undefined) => {
  const firstParagraph = (text ?? '').trim().split(/\n\s*\n/)[0] ?? '';
  const flattened = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (flattened.length <= MAX_DESCRIPTION_LENGTH) {
    return flattened;
  }
  return `${flattened.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
};
