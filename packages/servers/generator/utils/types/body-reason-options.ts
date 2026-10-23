import type { SchemaOptions } from './schema-options.ts';

export interface BodyReasonOptions {
  schema: SchemaOptions;
  noNamedPropertiesReason?: string;
  /** The executor reads a dot in a body key as a nested path, so such bodies cannot be sent. */
  rejectsDottedNames?: boolean;
}
