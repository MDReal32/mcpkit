import type { InputSchema } from './input-schema';
import type { RequestSpec } from './request-spec';
import type { ResponseSpec } from './response-spec';
import type { ToolEdition } from './tool-edition';

export interface ToolSpec {
  name: string;
  description: string;
  input: InputSchema;
  request: RequestSpec;
  response?: ResponseSpec;
  /** Per-edition overrides, keyed by the manifest's `editions`. */
  editions?: Readonly<Record<string, ToolEdition>>;
}
