import type { ArgumentNaming } from './argument-naming';
import type { SchemaOptions } from './schema-options';

export interface ToolDefinitionOptions {
  schema: SchemaOptions;
  naming: ArgumentNaming;
  /** Put in front of every tool description, so callers see which deployment the tool is for. */
  descriptionPrefix?: string;
}
