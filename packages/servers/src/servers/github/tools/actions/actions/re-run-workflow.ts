import { defineTool } from "@usemcpkit/core";

export const actionsActionsReRunWorkflow = defineTool({
  name: "actions:actions:re_run_workflow",
  description: "Re-run a workflow. Re-runs your workflow run using its `id`.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      run_id: {
        type: "integer",
        description: "The unique identifier of the workflow run.",
      },
      enable_debug_logging: {
        type: "boolean",
        description: "Whether to enable debug logging for the re-run.",
        default: false,
      },
    },
    required: ["owner", "repo", "run_id"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/rerun",
    body: ["enable_debug_logging"],
  },
});
