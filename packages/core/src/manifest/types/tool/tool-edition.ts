import type { RequestSpec } from './request-spec';
import type { ResponseSpec } from './response-spec';

/** Replaces the tool's request, and its response mapping when given, for one edition. */
export interface ToolEdition {
  request: RequestSpec;
  response?: ResponseSpec;
}
