import { defineTool } from "@usemcpkit/core";

export const reposChecksListForSuite = defineTool({
  name: "repos:checks:list_for_suite",
  description: "List check runs in a check suite. Lists check runs for a check suite using its `id`.",
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
      check_suite_id: {
        type: "integer",
        description: "The unique identifier of the check suite.",
      },
      check_name: {
        type: "string",
        description: "Returns check runs with the specified `name`.",
      },
      status: {
        type: "string",
        enum: ["queued", "in_progress", "completed"],
        description: "Returns check runs with the specified `status`.",
      },
      filter: {
        type: "string",
        default: "latest",
        enum: ["latest", "all"],
        description:
          "Filters check runs by their `completed_at` timestamp. `latest` returns the most recent check runs.",
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
    required: ["owner", "repo", "check_suite_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
    query: ["check_name", "status", "filter", "per_page", "page"],
  },
});
