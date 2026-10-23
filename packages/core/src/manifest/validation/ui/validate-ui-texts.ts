import { isJsonObject } from "../../../json";
import { UI_TEXT_KEYS } from "../../ui/const";

const KNOWN_TEXT_KEYS: readonly string[] = UI_TEXT_KEYS;

export const validateUiTexts = (texts: unknown, location: string) => {
  if (texts === undefined) {
    return [];
  }
  if (!isJsonObject(texts)) {
    return [`${location} must be an object of strings`];
  }
  return Object.entries(texts).flatMap(([key, value]) => {
    if (!KNOWN_TEXT_KEYS.includes(key)) {
      return [`${location}.${key} is not a text of the page, use one of: ${KNOWN_TEXT_KEYS.join(", ")}`];
    }
    return typeof value === "string" ? [] : [`${location}.${key} must be a string`];
  });
};
