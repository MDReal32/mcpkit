import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsListAiDuoWorkflowsWorkflowsCheckpoints = defineTool({
  name: "ai:gitlab_duo_workflows:list_ai_duo_workflows_workflows_checkpoints",
  description: "List all workflow checkpoints. Lists all checkpoints associated with a specific workflow.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      accept_compressed: {
        type: "boolean",
        default: false,
        description: "If `true`, returns compressed checkpoints.",
      },
      checkpoint_ns: {
        type: "string",
        description:
          "Only return checkpoints belonging to this LangGraph checkpoint namespace (the flow's own top-level lineage if omitted or blank). Unset (the default): return checkpoints from every lineage, unfiltered, preserving prior behavior.",
      },
      channels: {
        type: "string",
        description:
          "Comma-separated channels to return in each checkpoint's channel_values, at most 100, each 1 to 255 characters. Omit to return every channel. (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/ai/duo_workflows/workflows/{id}/checkpoints",
    query: ["accept_compressed", "checkpoint_ns", "channels"],
  },
});
