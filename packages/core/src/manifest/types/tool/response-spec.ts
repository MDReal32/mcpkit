import type { FieldSpec } from './field-spec';

export interface ResponseSpec {
  root?: string;
  fields?: FieldSpec;
}
