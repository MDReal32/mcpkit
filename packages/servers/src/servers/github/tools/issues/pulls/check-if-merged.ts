import { defineTool } from "@usemcpkit/core";

export const issuesPullsCheckIfMerged = defineTool({
  name: "issues:pulls:check_if_merged",
  description:
    "Check if a pull request has been merged. Checks if a pull request has been merged into the base branch. The HTTP status of the response indicates whether or not the pull request has been merged; the response body is empty.",
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
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/merge",
  },
});
