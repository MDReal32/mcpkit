import type { TarFixtureEntry } from './tar-fixture-entry';
import { writeTarField } from './write-tar-field';

const BLOCK_SIZE = 512;

/** Builds a minimal ustar archive (regular files only) like the one inside an npm tarball. */
export const createTar = (entries: readonly TarFixtureEntry[]) => {
  const blocks = entries.flatMap((entry) => {
    const content = new TextEncoder().encode(entry.content);
    const header = new Uint8Array(BLOCK_SIZE);
    writeTarField(header, 0, entry.path);
    writeTarField(header, 100, '0000755\0');
    writeTarField(header, 124, `${content.length.toString(8).padStart(11, '0')}\0`);
    writeTarField(header, 156, '0');
    writeTarField(header, 257, 'ustar\0');
    writeTarField(header, 345, entry.prefix ?? '');
    const padded = new Uint8Array(Math.ceil(content.length / BLOCK_SIZE) * BLOCK_SIZE);
    padded.set(content);
    return [header, padded];
  });
  return new Uint8Array(Buffer.concat([...blocks, new Uint8Array(BLOCK_SIZE * 2)]));
};
