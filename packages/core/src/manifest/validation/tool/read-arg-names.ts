import { isStringRecord } from "../../../json";
import { isStringList } from "../guards/is-string-list";

export const readArgNames = (spec: unknown) => {
  if (isStringList(spec)) {
    return spec;
  }
  if (isStringRecord(spec)) {
    return Object.values(spec);
  }
  return undefined;
};
