import type { SchemaOptions } from "./schema-options";

export interface BodyReasonOptions {
  schema: SchemaOptions;
  /** The executor reads a dot in a body key as a nested path, so such bodies cannot be sent. */
  /** Part name for a multipart body the spec describes only as an array of files. */
  filePartName?: string;
  rejectsDottedNames?: boolean;
}
