import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsGetProjectsMergeRequestsChanges = defineTool({
  name: "issues:merge_requests:get_projects_merge_requests_changes",
  description: "Retrieve merge request changes. Retrieves changes for a specified merge request.",
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
    path: "/projects/{id}/merge_requests/{merge_request_iid}/changes",
    query: ["unidiff"],
  },
});
