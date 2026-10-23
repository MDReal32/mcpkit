import type { ArgSpec, ToolArgs } from "../../manifest";
import { toNameMapping } from "../../manifest";

export const collectArgs = (spec: ArgSpec | undefined, args: ToolArgs) => {
  if (!spec) {
    return {};
  }
  const entries = Object.entries(toNameMapping(spec))
    .filter(([, argName]) => args[argName] !== undefined)
    .map(([outgoingKey, argName]) => [outgoingKey, args[argName]]);
  return Object.fromEntries(entries);
};
