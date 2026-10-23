import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestsDeleteProjectsMergeRequests = defineTool({
  name: "issues:merge_requests:delete_projects_merge_requests",
  description:
    "Delete a merge request. Deletes a specified merge request for a project. Administrators and project Owners only.",
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
    method: "DELETE",
    path: "/projects/{id}/merge_requests/{merge_request_iid}",
  },
});
