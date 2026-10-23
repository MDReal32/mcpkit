import type { InputSchema, ToolArgs } from "../../manifest";
import { ToolError } from "../tool-error";

export const assertRequiredArgs = (input: InputSchema, args: ToolArgs) => {
  const missing = (input.required ?? []).filter((name) => args[name] === undefined);
  if (missing.length) {
    throw new ToolError(`missing required argument(s): ${missing.join(", ")}`);
  }
};
