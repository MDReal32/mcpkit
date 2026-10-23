import { TAR_SIZE_FIELD } from "../const";
import { readTarString } from "./read-tar-string";

export const readTarEntrySize = (header: Uint8Array) => {
  const size = Number.parseInt(readTarString(header, TAR_SIZE_FIELD).trim() || "0", 8);
  if (!Number.isSafeInteger(size) || size < 0) {
    throw new Error("tarball has an invalid entry size");
  }
  return size;
};
