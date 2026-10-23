import type { JsonSchema } from './json-schema';

export interface InputSchema extends JsonSchema {
  type: 'object';
}
