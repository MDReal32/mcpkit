import { defineTool } from "@usemcpkit/core";

export const issuesPullsListReviews = defineTool({
  name: "issues:pulls:list_reviews",
  description:
    "List reviews for a pull request. Lists all reviews for a specified pull request. The list of reviews returns in chronological order.",
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
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["owner", "repo", "pull_number"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/reviews",
    query: ["per_page", "page"],
  },
});
