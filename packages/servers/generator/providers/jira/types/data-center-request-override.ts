import type { JsonSchema } from "@usemcpkit/core";
import type { ToolDefinition } from "../../../utils/types/tool-definition";

export interface DataCenterRequestOverride {
  /** Name of the generated tool, whose own request (the Cloud one in the spec) becomes the `cloud` edition. */
  tool: string;
  /** The Data Center request, which becomes the tool's default one. */
  request: ToolDefinition["request"];
  /** Arguments only the Data Center request reads. */
  properties: Record<string, JsonSchema>;
  /** Of {@link properties}, the ones the Data Center request cannot do without. */
  required: string[];
  /** Arguments only the Cloud request reads. */
  cloudOnlyArguments: string[];
}
