import { MAX_DESCRIPTION_LENGTH } from './const';

export const cleanDescription = (text: string | undefined, stripBold: boolean) => {
  const firstParagraph = (text ?? '').trim().split(/\n\s*\n/)[0] ?? '';
  const withoutLinks = firstParagraph.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const flattened = (stripBold ? withoutLinks.replace(/\*\*/g, '') : withoutLinks).replace(/\s+/g, ' ').trim();
  if (flattened.length <= MAX_DESCRIPTION_LENGTH) {
    return flattened;
  }
  return `${flattened.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
};
