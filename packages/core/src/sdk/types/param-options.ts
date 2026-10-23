import type { JsonSchema } from "../../manifest";

export type ParamOptions = Pick<JsonSchema, "default" | "enum">;
