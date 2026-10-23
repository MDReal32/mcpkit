import type { RequestSpec, ToolArgs } from "../../manifest";
import { expandJsonPaths } from "../json/expand-json-paths";
import { collectArgs } from "./collect-args";

export const buildBodyPayload = ({ body, bodyArg, fixedBody }: RequestSpec, args: ToolArgs) => {
  if (bodyArg !== undefined) {
    return args[bodyArg];
  }
  const values = { ...fixedBody, ...collectArgs(body, args) };
  return Object.keys(values).length > 0 ? expandJsonPaths(values) : undefined;
};
