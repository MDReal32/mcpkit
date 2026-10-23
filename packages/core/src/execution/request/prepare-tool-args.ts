import type { ToolArgs, ToolSpec } from "../../manifest";
import { applyInputDefaults } from "./apply-input-defaults";
import { assertRequiredArgs } from "./assert-required-args";

export const prepareToolArgs = (tool: ToolSpec, rawArgs: ToolArgs = {}) => {
  const args = applyInputDefaults(tool.input, rawArgs);
  assertRequiredArgs(tool.input, args);
  return args;
};
