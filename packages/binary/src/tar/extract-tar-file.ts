import { TAR_BLOCK_SIZE, TAR_FILE_TYPES, TAR_TYPE_OFFSET } from '../const';
import { readTarEntryPath } from './read-tar-entry-path';
import { readTarEntrySize } from './read-tar-entry-size';

/** Reads one regular file out of an uncompressed ustar archive, as produced by `npm pack`. */
export const extractTarFile = (archive: Uint8Array, entryPath: string) => {
  let offset = 0;
  while (offset + TAR_BLOCK_SIZE <= archive.length) {
    const header = archive.subarray(offset, offset + TAR_BLOCK_SIZE);
    if (header.every((byte) => byte === 0)) {
      break;
    }
    const size = readTarEntrySize(header);
    const dataStart = offset + TAR_BLOCK_SIZE;
    const isFile = TAR_FILE_TYPES.includes(header[TAR_TYPE_OFFSET] ?? 0);
    if (isFile && readTarEntryPath(header) === entryPath) {
      if (dataStart + size > archive.length) {
        throw new Error(`tarball entry ${entryPath} is truncated`);
      }
      return archive.slice(dataStart, dataStart + size);
    }
    offset = dataStart + Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
  }
  throw new Error(`tarball has no ${entryPath}`);
};
