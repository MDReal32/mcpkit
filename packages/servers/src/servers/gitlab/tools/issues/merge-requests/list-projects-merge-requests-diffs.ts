import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsListProjectsMergeRequestsDiffs = defineTool({
  name: "issues:merge_requests:list_projects_merge_requests_diffs",
  description: "List all merge request diffs. Lists all merge request diffs.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "Internal ID of the merge request.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
      unidiff: {
        type: "boolean",
        default: false,
        description: "If `true`, presents diffs in the unified diff format.",
      },
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/diffs",
    query: ["page", "per_page", "unidiff"],
  },
});
