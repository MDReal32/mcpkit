import type { SchemaOptions } from '../types/schema-options.ts';

export const MAX_DESCRIPTION_LENGTH = 400;

export const BODY_KEY_PREFIX = 'body_';

export const DEFAULT_SCHEMA_OPTIONS: SchemaOptions = {
  maxDepth: 3,
  includeDefaults: true,
  widenMixedScalarsToString: false,
  stripBold: false,
};
