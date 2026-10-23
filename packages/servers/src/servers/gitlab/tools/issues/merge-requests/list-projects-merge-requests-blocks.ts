import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsListProjectsMergeRequestsBlocks = defineTool({
  name: "issues:merge_requests:list_projects_merge_requests_blocks",
  description:
    "List all dependencies for a merge request. List all merge request dependencies for a specified merge request.",
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
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/blocks",
    query: ["page", "per_page"],
  },
});
