import type { ParamOptions } from "../types/param-options";
import { string } from "./string";

export const oneOf = (values: readonly string[], description?: string, options: ParamOptions = {}) =>
  string(description, { enum: values, ...options });
