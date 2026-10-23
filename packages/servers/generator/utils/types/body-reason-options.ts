import type { SchemaOptions } from "./schema-options";

export interface BodyReasonOptions {
  schema: SchemaOptions;
  /** The executor reads a dot in a body key as a nested path, so such bodies cannot be sent. */
  rejectsDottedNames?: boolean;
}
