import { defineTool } from "@usemcpkit/core";

export const actionsActionsReviewCustomGatesForRun = defineTool({
  name: "actions:actions:review_custom_gates_for_run",
  description:
    'Review custom deployment protection rules for a workflow run. Approve or reject custom deployment protection rules provided by a GitHub App for a workflow run. For more information, see "Using environments for deployment."',
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
      environment_name: {
        type: "string",
        description: "The name of the environment to approve or reject.",
      },
      comment: {
        type: "string",
        description: "Optional comment to include with the review.",
      },
      state: {
        type: "string",
        description: "Whether to approve or reject deployment to the specified environments.",
        enum: ["approved", "rejected"],
      },
    },
    required: ["owner", "repo", "run_id", "environment_name"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule",
    body: ["environment_name", "comment", "state"],
  },
});
