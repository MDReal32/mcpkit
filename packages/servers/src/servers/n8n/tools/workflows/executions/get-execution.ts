import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsGetExecution = defineTool({
  name: "workflows:executions:get_execution",
  description: "Retrieve an execution. Retrieve an execution from your instance.",
  input: {
    type: "object",
    properties: {
      executionId: {
        type: "integer",
        description: "The ID of the execution.",
      },
      includeData: {
        type: "string",
        description: "Whether or not to include the execution's detailed data.",
        default: "false",
        enum: ["true", "false"],
      },
      ignoreDataSizeLimit: {
        type: "string",
        description:
          "Whether to return the full execution data even if it exceeds the configured size limit (EXECUTIONS_DATA_MAX_DISPLAY_SIZE). Oversized executions are otherwise returned without their data.",
        default: "false",
        enum: ["true", "false"],
      },
      redactExecutionData: {
        type: "string",
        description:
          "Controls execution data redaction. When `true`, execution output data is always redacted. When `false`, requests unredacted (revealed) data — requires the `execution:reveal` scope. When omitted, follows the workflow redaction policy.",
        enum: ["true", "false"],
      },
    },
    required: ["executionId"],
  },
  request: {
    method: "GET",
    path: "/executions/{executionId}",
    query: ["includeData", "ignoreDataSizeLimit", "redactExecutionData"],
  },
});
