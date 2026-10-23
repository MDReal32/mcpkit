import { defineTool } from "@usemcpkit/core";

export const issuesIssuesListCommentsForRepo = defineTool({
  name: "issues:issues:list_comments_for_repo",
  description:
    "List issue comments for a repository. You can use the REST API to list comments on issues and pull requests for a repository. Every pull request is an issue, but not every issue is a pull request.",
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
      sort: {
        type: "string",
        default: "created",
        enum: ["created", "updated"],
        description: "The property to sort the results by.",
      },
      direction: {
        type: "string",
        enum: ["asc", "desc"],
        description: "Either `asc` or `desc`. Ignored without the `sort` parameter.",
      },
      since: {
        type: "string",
        description:
          "Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
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
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/issues/comments",
    query: ["sort", "direction", "since", "per_page", "page"],
  },
});
