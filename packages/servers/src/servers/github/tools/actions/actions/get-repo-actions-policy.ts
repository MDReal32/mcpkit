import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetRepoActionsPolicy = defineTool({
  name: "actions:actions:get_repo_actions_policy",
  description: "Get a repository Actions policy. Get a specific Actions policy for a repository.",
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
      policy_id: {
        type: "integer",
        description: "The ID of the policy.",
      },
    },
    required: ["owner", "repo", "policy_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/policies/{policy_id}",
  },
});
