import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsStopManyExecutions = defineTool({
  name: "workflows:executions:stop_many_executions",
  description: "Stop multiple executions. Stop multiple executions from your instance based on filter criteria.",
  input: {
    type: "object",
    properties: {
      status: {
        type: "array",
        description: "Array of execution statuses to stop. Must include at least one status.",
        items: {
          type: "string",
          enum: ["queued", "running", "waiting"],
        },
      },
      workflowId: {
        type: "string",
        description:
          "Optional workflow ID to filter executions. If not provided, will stop executions across all accessible workflows. The literal value `all` has the same effect as omitting it.",
      },
      startedAfter: {
        type: "string",
        description: "Only stop executions that started after this time.",
      },
      startedBefore: {
        type: "string",
        description: "Only stop executions that started before this time.",
      },
    },
    required: ["status"],
  },
  request: {
    method: "POST",
    path: "/executions/stop",
    body: ["status", "workflowId", "startedAfter", "startedBefore"],
  },
});
