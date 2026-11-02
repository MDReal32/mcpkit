import { isJsonObject } from "../../../json";
import { UI_AUTH_KEYS } from "../../ui/const";
import { validateUiActions } from "./validate-ui-actions";
import { validateUiInputs } from "./validate-ui-inputs";

/** A stdio upstream's form asks for its `forwardEnv` credentials; it has no domain and no CLI to take a token from. */
export const validateStdioUi = (upstream: Readonly<Record<string, unknown>>) => {
  const { ui } = upstream;
  if (ui === undefined) {
    return [];
  }
  if (!isJsonObject(ui)) {
    return ["upstream.ui must be an object"];
  }
  const forwardEnv = Array.isArray(upstream.forwardEnv) ? upstream.forwardEnv.map(String) : [];
  const unknownKeys = Object.keys(ui)
    .filter((key) => !UI_AUTH_KEYS.includes(key))
    .map((key) => `upstream.ui.${key} is not allowed here`);
  return [
    ...unknownKeys,
    ...validateUiInputs(ui.inputs, "upstream.ui.inputs", forwardEnv),
    ...validateUiActions(ui.actions, "upstream.ui.actions", false, false),
  ];
};
