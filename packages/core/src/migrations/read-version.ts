import { isJsonObject } from "../json";

export const FIRST_VERSION = 1;

/** Data without a `version` is the first version. */
export const readVersion = (data: unknown) =>
  isJsonObject(data) && data.version !== undefined ? data.version : FIRST_VERSION;
