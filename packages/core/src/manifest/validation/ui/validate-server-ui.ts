import { isJsonObject } from "../../../json";
import { UI_SERVER_KEYS } from "../../ui/const";
import { validateUiTexts } from "./validate-ui-texts";

export const validateServerUi = (manifest: Readonly<Record<string, unknown>>) => {
  const { ui } = manifest;
  if (ui === undefined) {
    return [];
  }
  if (!isJsonObject(ui)) {
    return ["ui must be an object"];
  }
  const unknownKeys = Object.keys(ui)
    .filter((key) => !UI_SERVER_KEYS.includes(key))
    .map((key) => `ui.${key} is not allowed here, use it on an auth entry`);
  return [...unknownKeys, ...validateUiTexts(ui.texts, "ui.texts")];
};
