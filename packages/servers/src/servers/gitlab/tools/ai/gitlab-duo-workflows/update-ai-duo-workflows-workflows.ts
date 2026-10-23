import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsUpdateAiDuoWorkflowsWorkflows = defineTool({
  name: "ai:gitlab_duo_workflows:update_ai_duo_workflows_workflows",
  description: "Update the workflow status. Updates the execution status of a specified workflow.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      status_event: {
        type: "string",
        description: "Status event to apply to the workflow, for example `finish`.",
      },
      drop_reason: {
        type: "string",
        description:
          "Why the service dropped the session. Ignored unless status_event is drop; a value the service may not name is recorded as api_reported",
      },
    },
    required: ["id", "status_event"],
  },
  request: {
    method: "PATCH",
    path: "/ai/duo_workflows/workflows/{id}",
    body: ["status_event", "drop_reason"],
  },
});
