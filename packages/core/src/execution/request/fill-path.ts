import type { ToolArgs } from "../../manifest";
import { ToolError } from "../tool-error";

export const fillPath = (template: string, args: ToolArgs) =>
  template.replace(/\{(\w+)\}/g, (_placeholder, name: string) => {
    const value = args[name];
    if (value === undefined) {
      throw new ToolError(`path parameter "${name}" not provided`);
    }
    return encodeURIComponent(String(value));
  });
