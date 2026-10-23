import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsGetProjectsMergeRequestsRawDiffs = defineTool({
  name: "issues:merge_requests:get_projects_merge_requests_raw_diffs",
  description: "Retrieve merge request raw diffs. Retrieves the raw diffs of the files changed in a merge request.",
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
    },
    required: ["id", "merge_request_iid"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/raw_diffs",
  },
});
