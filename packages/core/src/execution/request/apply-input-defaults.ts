import type { InputSchema, ToolArgs } from "../../manifest";

export const applyInputDefaults = (input: InputSchema, args: ToolArgs) => {
  const defaults = Object.entries(input.properties ?? {})
    .filter(([, schema]) => schema.default !== undefined)
    .map(([name, schema]) => [name, schema.default]);
  return { ...Object.fromEntries(defaults), ...args };
};
