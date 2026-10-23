import { defineTool } from "@usemcpkit/core";

export const orgsInteractionsRemovePullRequestBypassListForRepo = defineTool({
  name: "orgs:interactions:remove_pull_request_bypass_list_for_repo",
  description:
    "Remove users from the pull request creation cap bypass list for a repository. Removes users from the pull request creation cap bypass list for a repository. Removed users will be subject to any configured pull request creation cap.",
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
      users: {
        type: "array",
        description: "A list of user logins to add or remove from the bypass list.",
        items: {
          type: "string",
        },
      },
    },
    required: ["owner", "repo", "users"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/interaction-limits/pulls/bypass-list",
    body: ["users"],
  },
});
