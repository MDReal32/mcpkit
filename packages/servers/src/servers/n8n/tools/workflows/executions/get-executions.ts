import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsGetExecutions = defineTool({
  name: "workflows:executions:get_executions",
  description: "Retrieve all executions. Retrieve all executions from your instance.",
  input: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
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
      status: {
        type: "string",
        description: "Status to filter the executions by.",
        enum: ["canceled", "crashed", "error", "new", "running", "success", "unknown", "waiting"],
      },
      workflowId: {
        type: "string",
        description: "Workflow to filter the executions by.",
      },
      projectId: {
        type: "string",
      },
      startedAfter: {
        type: "string",
        description: "Only return executions that started after this time.",
      },
      startedBefore: {
        type: "string",
        description: "Only return executions that started before this time.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/executions",
    query: [
      "limit",
      "cursor",
      "includeData",
      "ignoreDataSizeLimit",
      "redactExecutionData",
      "status",
      "workflowId",
      "projectId",
      "startedAfter",
      "startedBefore",
    ],
  },
});
