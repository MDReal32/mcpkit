/** `operation-id` names actions after the spec's operationId, `path` derives them from the method and path. */
export type OperationNaming = "operation-id" | "path";

export interface SpecSource {
  /** Kebab-case tool group, also the folder under `tools/`. */
  group: string;
  /** Prefix of every tool description, so callers see which deployment the tool is for. */
  descriptionPrefix: string;
  url: string;
  /** Path every supported operation lives under, after `specPathPrefix` is applied. */
  apiRoot: string;
  /** Prepended to the spec's paths when they are relative to the spec's server URL. */
  specPathPrefix: string;
  naming: OperationNaming;
}
