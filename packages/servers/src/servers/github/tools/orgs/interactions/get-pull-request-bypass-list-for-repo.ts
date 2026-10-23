import { defineTool } from "@usemcpkit/core";

export const orgsInteractionsGetPullRequestBypassListForRepo = defineTool({
  name: "orgs:interactions:get_pull_request_bypass_list_for_repo",
  description:
    "Get pull request creation cap bypass list for a repository. Lists the users that are on the pull request creation cap bypass list for a repository. Users on this list can create pull requests regardless of any configured pull request creation cap.",
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
    method: "GET",
    path: "/repos/{owner}/{repo}/interaction-limits/pulls/bypass-list",
  },
});
