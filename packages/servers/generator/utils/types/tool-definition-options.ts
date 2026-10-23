import type { ArgumentNaming } from './argument-naming.ts';
import type { SchemaOptions } from './schema-options.ts';

export interface ToolDefinitionOptions {
  schema: SchemaOptions;
  naming: ArgumentNaming;
  /** Put in front of every tool description, so callers see which deployment the tool is for. */
  descriptionPrefix?: string;
}
