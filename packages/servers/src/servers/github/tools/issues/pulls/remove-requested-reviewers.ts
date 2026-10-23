import { defineTool } from "@usemcpkit/core";

export const issuesPullsRemoveRequestedReviewers = defineTool({
  name: "issues:pulls:remove_requested_reviewers",
  description:
    "Remove requested reviewers from a pull request. Removes review requests from a pull request for a given set of users and/or teams.",
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
      reviewers: {
        type: "array",
        description: "An array of user `login`s that will be removed.",
        items: {
          type: "string",
        },
      },
      team_reviewers: {
        type: "array",
        description: "An array of team `slug`s that will be removed.",
        items: {
          type: "string",
        },
      },
    },
    required: ["owner", "repo", "pull_number", "reviewers"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
    body: ["reviewers", "team_reviewers"],
  },
});
