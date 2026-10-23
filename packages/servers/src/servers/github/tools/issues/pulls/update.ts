import { defineTool } from "@usemcpkit/core";

export const issuesPullsUpdate = defineTool({
  name: "issues:pulls:update",
  description:
    "Update a pull request. Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see GitHub's products in the GitHub Help documentation.",
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
      title: {
        type: "string",
        description: "The title of the pull request.",
      },
      body: {
        type: "string",
        description: "The contents of the pull request.",
      },
      state: {
        type: "string",
        description: "State of this Pull Request. Either `open` or `closed`.",
        enum: ["open", "closed"],
      },
      base: {
        type: "string",
        description:
          "The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot update the base branch on a pull request to point to another repository.",
      },
      maintainer_can_modify: {
        type: "boolean",
        description: "Indicates whether maintainers can modify the pull request.",
      },
    },
    required: ["owner", "repo", "pull_number"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}",
    body: ["title", "body", "state", "base", "maintainer_can_modify"],
  },
});
