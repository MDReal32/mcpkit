import { isJsonObject } from "../../../json";
import { UI_INPUT_KEYS } from "../../ui/const";

export const validateUiInputs = (inputs: unknown, location: string, envNames: readonly string[]) => {
  if (inputs === undefined) {
    return [];
  }
  if (!isJsonObject(inputs)) {
    return [`${location} must map env var names to objects`];
  }
  return Object.entries(inputs).flatMap(([name, input]) => {
    const inputLocation = `${location}.${name}`;
    if (!envNames.includes(name)) {
      return [`${inputLocation}: "${name}" is not a credential of this auth entry (${envNames.join(", ")})`];
    }
    if (!isJsonObject(input)) {
      return [`${inputLocation} must be an object`];
    }
    return UI_INPUT_KEYS.filter((key) => input[key] !== undefined && typeof input[key] !== "string").map(
      (key) => `${inputLocation}.${key} must be a string`,
    );
  });
};
