import { TAR_NAME_FIELD, TAR_PREFIX_FIELD } from "../const";
import { readTarString } from "./read-tar-string";

export const readTarEntryPath = (header: Uint8Array) => {
  const name = readTarString(header, TAR_NAME_FIELD);
  const prefix = readTarString(header, TAR_PREFIX_FIELD);
  return prefix ? `${prefix}/${name}` : name;
};
