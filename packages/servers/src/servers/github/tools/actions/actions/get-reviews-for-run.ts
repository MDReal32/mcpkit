import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetReviewsForRun = defineTool({
  name: "actions:actions:get_reviews_for_run",
  description:
    "Get the review history for a workflow run. Anyone with read access to the repository can use this endpoint.",
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
    },
    required: ["owner", "repo", "run_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/approvals",
  },
});
