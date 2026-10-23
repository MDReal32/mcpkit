import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsWorkflowsCheckpointsByThreadTs = defineTool({
  name: "ai:gitlab_duo_workflows:get_ai_duo_workflows_workflows_checkpoints_by_thread_ts",
  description:
    "Get a workflow checkpoint reconstructed from incremental blobs. Retrieves a full workflow checkpoint reconstructed from incremental data blobs.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      thread_ts: {
        type: "string",
        description: "The langgraph thread_ts of the checkpoint",
      },
      accept_compressed: {
        type: "boolean",
        default: false,
        description: "If `true`, returns the compressed checkpoint.",
      },
    },
    required: ["id", "thread_ts"],
  },
  request: {
    method: "GET",
    path: "/ai/duo_workflows/workflows/{id}/checkpoints/by_thread_ts",
    query: ["thread_ts", "accept_compressed"],
  },
});
