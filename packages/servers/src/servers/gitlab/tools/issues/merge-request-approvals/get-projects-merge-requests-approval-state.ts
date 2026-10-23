import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsGetProjectsMergeRequestsApprovalState = defineTool({
  name: "issues:merge_request_approvals:get_projects_merge_requests_approval_state",
  description:
    "Retrieve approval details for a merge request. Retrieves approval details for a specified merge request. If a user has modified the approval rules for the merge request, the response includes `approval_rules_overwritten`.",
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
    path: "/projects/{id}/merge_requests/{merge_request_iid}/approval_state",
  },
});
