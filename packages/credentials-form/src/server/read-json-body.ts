import type { IncomingMessage } from 'node:http';
import { MAX_BODY_BYTES } from '../const';

export const readJsonBody = async (incoming: IncomingMessage) => {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of incoming) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) {
      throw new Error('request body is too large');
    }
    chunks.push(buffer);
  }
  const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  return parsed;
};
