import { isJsonObject } from "../../json";
import { FIRST_CONFIG_VERSION } from "../const";

/** A config without a `version` is the first one. */
export const readConfigVersion = (data: unknown) =>
  isJsonObject(data) && data.version !== undefined ? data.version : FIRST_CONFIG_VERSION;
