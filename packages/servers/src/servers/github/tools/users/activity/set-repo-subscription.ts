import { defineTool } from "@usemcpkit/core";

export const usersActivitySetRepoSubscription = defineTool({
  name: "users:activity:set_repo_subscription",
  description:
    "Set a repository subscription. If you would like to watch a repository, set `subscribed` to `true`. If you would like to ignore notifications made within a repository, set `ignored` to `true`. If you would like to stop watching a repository, delete the repository's subscription completely.",
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
      subscribed: {
        type: "boolean",
        description: "Determines if notifications should be received from this repository.",
      },
      ignored: {
        type: "boolean",
        description: "Determines if all notifications should be blocked from this repository.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/subscription",
    body: ["subscribed", "ignored"],
  },
});
