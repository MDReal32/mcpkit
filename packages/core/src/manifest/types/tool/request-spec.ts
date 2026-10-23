import type { ArgSpec } from './arg-spec';
import type { FixedValues } from './fixed-values';
import type { HttpMethod } from './http-method';

export interface RequestSpec {
  method: HttpMethod;
  /** `{arg}` placeholders are replaced by URL-encoded argument values. */
  path: string;
  query?: ArgSpec;
  /** Outgoing keys may be dotted paths such as `fields.project.key` or `ancestors.0.id` to build nested JSON. */
  body?: ArgSpec;
  fixedQuery?: FixedValues;
  /** Dotted paths like `body`; an argument with the same key wins. */
  fixedBody?: FixedValues;
}
