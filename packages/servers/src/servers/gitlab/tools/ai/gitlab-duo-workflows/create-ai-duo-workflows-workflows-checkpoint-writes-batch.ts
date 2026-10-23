import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsCheckpointWritesBatch = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_checkpoint_writes_batch",
  description:
    "Create multiple workflow checkpoint writes. Writes multiple checkpoint entries for a workflow in a single request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      thread_ts: {
        type: "string",
        description: "LangGraph `thread_ts` of the checkpoint.",
      },
      checkpoint_writes: {
        type: "array",
        description: "List of checkpoint writes.",
        items: {
          type: "object",
          properties: {
            task: {
              type: "string",
              description: "ID of the task.",
            },
            idx: {
              type: "integer",
              description: "Index of the checkpoint write.",
            },
            channel: {
              type: "string",
              description: "Name of the channel.",
            },
            write_type: {
              type: "string",
              description: "Type of data.",
            },
            data: {
              type: "string",
              description: "Checkpoint write data.",
            },
          },
          required: ["task", "idx", "channel", "write_type", "data"],
        },
      },
    },
    required: ["id", "thread_ts", "checkpoint_writes"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/workflows/{id}/checkpoint_writes_batch",
    body: ["thread_ts", "checkpoint_writes"],
  },
});
