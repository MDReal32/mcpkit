import type { ArgumentNaming } from "./argument-naming";
import type { SchemaOptions } from "./schema-options";

export interface ToolDefinitionOptions {
  schema: SchemaOptions;
  naming: ArgumentNaming;
  /** Put in front of every tool description, so callers see which deployment the tool is for. */
  descriptionPrefix?: string;
  /** GET paths that stream a file although the spec declares no readable response body (redirects, empty content). */
  downloadPaths?: readonly RegExp[];
}
