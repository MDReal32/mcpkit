import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsWorkflowsCheckpoints = defineTool({
  name: "ai:gitlab_duo_workflows:get_ai_duo_workflows_workflows_checkpoints",
  description:
    "Get details on a workflow checkpoint. Retrieves detailed information about a specific workflow checkpoint.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      checkpoint_id: {
        type: "integer",
        description: "ID of the checkpoint.",
      },
      accept_compressed: {
        type: "boolean",
        default: false,
        description: "If `true`, returns the compressed checkpoint.",
      },
    },
    required: ["id", "checkpoint_id"],
  },
  request: {
    method: "GET",
    path: "/ai/duo_workflows/workflows/{id}/checkpoints/{checkpoint_id}",
    query: ["accept_compressed"],
  },
});
