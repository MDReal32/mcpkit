import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsRestart = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_restart",
  description:
    "Restart a failed or stopped workflow as a new session. Creates and starts a new session with the flow, goal, noteable, source, privileges and trigger of the given workflow. The original workflow is not modified.",
  input: {
    type: "object",
    properties: {
      workflow_id: {
        type: "string",
        description: "The ID of the workflow to restart",
      },
    },
    required: ["workflow_id"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/workflows/{workflow_id}/restart",
  },
});
