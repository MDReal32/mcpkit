import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsCreateProjectsMergeRequestsUnapprove = defineTool({
  name: "issues:merge_request_approvals:create_projects_merge_requests_unapprove",
  description:
    "Unapprove a merge request. Unapproves a merge request. Removes the approval for the currently authenticated user from a specified merge request.",
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
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/unapprove",
  },
});
