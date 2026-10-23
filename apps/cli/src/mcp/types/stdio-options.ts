import type { Readable, Writable } from 'node:stream';

export interface StdioOptions {
  input?: Readable;
  output?: Writable;
}
