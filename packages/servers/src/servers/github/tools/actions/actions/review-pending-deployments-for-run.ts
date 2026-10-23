import { defineTool } from "@usemcpkit/core";

export const actionsActionsReviewPendingDeploymentsForRun = defineTool({
  name: "actions:actions:review_pending_deployments_for_run",
  description:
    "Review pending deployments for a workflow run. Approve or reject pending deployments that are waiting on approval by a required reviewer.",
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
      environment_ids: {
        type: "array",
        description: "The list of environment ids to approve or reject",
        items: {
          type: "integer",
        },
      },
      state: {
        type: "string",
        description: "Whether to approve or reject deployment to the specified environments.",
        enum: ["approved", "rejected"],
      },
      comment: {
        type: "string",
        description: "A comment to accompany the deployment review",
      },
    },
    required: ["owner", "repo", "run_id", "environment_ids", "state", "comment"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments",
    body: ["environment_ids", "state", "comment"],
  },
});
