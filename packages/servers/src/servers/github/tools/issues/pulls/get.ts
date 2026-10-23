import { defineTool } from "@usemcpkit/core";

export const issuesPullsGet = defineTool({
  name: "issues:pulls:get",
  description:
    "Get a pull request. Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see GitHub's products in the GitHub Help documentation.",
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
      pull_number: {
        type: "integer",
        description: "The number that identifies the pull request.",
      },
    },
    required: ["owner", "repo", "pull_number"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}",
  },
});
