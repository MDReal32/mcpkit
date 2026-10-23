import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsWorkflowsTraceJsonl = defineTool({
  name: "ai:gitlab_duo_workflows:get_ai_duo_workflows_workflows_trace_jsonl",
  description:
    "Get workflow trace as JSONL. Returns the full trace of a workflow session as JSON Lines (JSONL). Each line is a JSON object representing one checkpoint event in chronological order.",
  input: {
    type: "object",
    properties: {
      workflow_id: {
        type: "integer",
        description: "ID of the workflow.",
      },
      full: {
        type: "boolean",
        description:
          "If `true`, includes internal channels such as conversation history and handover. Restricted to the workflow owner. Non-owners receive a `403`.",
      },
      thread: {
        type: "string",
        description:
          "Thread to return. Omit for the full trace across all threads. Use `latest` for the most recent thread, or a thread ID for a specific thread. Has no effect on workflows that do not use incremental checkpoint storage.",
      },
    },
    required: ["workflow_id"],
  },
  request: {
    method: "GET",
    path: "/ai/duo_workflows/workflows/{workflow_id}/trace.jsonl",
    query: ["full", "thread"],
  },
});
