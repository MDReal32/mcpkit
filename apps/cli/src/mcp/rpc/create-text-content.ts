import type { TextContent } from '../types/text-content';

export const createTextContent = (text: string) => {
  const content: TextContent = { type: 'text', text };
  return [content];
};
