import { defineTool } from "@usemcpkit/core";

export const usersActivityDeleteRepoSubscription = defineTool({
  name: "users:activity:delete_repo_subscription",
  description:
    "Delete a repository subscription. This endpoint should only be used to stop watching a repository. To control whether or not you wish to receive notifications from a repository, set the repository's subscription manually.",
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
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/subscription",
  },
});
