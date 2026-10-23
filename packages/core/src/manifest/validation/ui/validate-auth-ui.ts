import { isJsonObject } from "../../../json";
import { UI_AUTH_KEYS, UI_AUTH_TYPES } from "../../ui/const";
import { validateUiActions } from "./validate-ui-actions";
import { validateUiInputs } from "./validate-ui-inputs";

const ENV_KEYS = ["env", "usernameEnv", "passwordEnv"] as const;

export const validateAuthUi = (auth: Readonly<Record<string, unknown>>, location: string, hasDomain: boolean) => {
  const { ui } = auth;
  const uiLocation = `${location}.ui`;
  if (ui === undefined) {
    return [];
  }
  if (typeof auth.type !== "string" || !UI_AUTH_TYPES.includes(auth.type)) {
    return [`${uiLocation} is only allowed for auth types: ${UI_AUTH_TYPES.join(", ")}`];
  }
  if (!isJsonObject(ui)) {
    return [`${uiLocation} must be an object`];
  }
  const envNames = ENV_KEYS.flatMap((key) => (typeof auth[key] === "string" ? [auth[key]] : []));
  const unknownKeys = Object.keys(ui)
    .filter((key) => !UI_AUTH_KEYS.includes(key))
    .map((key) => `${uiLocation}.${key} is not allowed here, use it on the manifest`);
  return [
    ...unknownKeys,
    ...validateUiInputs(ui.inputs, `${uiLocation}.inputs`, envNames),
    ...validateUiActions(ui.actions, `${uiLocation}.actions`, hasDomain, auth.type !== "basic"),
  ];
};
