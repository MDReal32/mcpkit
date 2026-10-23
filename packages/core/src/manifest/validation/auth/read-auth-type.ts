import { isJsonObject } from "../../../json";

export const readAuthType = (entry: unknown) => (isJsonObject(entry) ? entry.type : undefined);
