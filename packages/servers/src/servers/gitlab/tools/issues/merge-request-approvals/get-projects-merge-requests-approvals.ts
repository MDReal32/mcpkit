import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsGetProjectsMergeRequestsApprovals = defineTool({
  name: "issues:merge_request_approvals:get_projects_merge_requests_approvals",
  description:
    "Retrieve approval state for a merge request. Retrieves the approval state for a specified merge request. In the response, `approved_by` contains information about all approvers of the merge request, regardless of whether those approvals satisfy any approval rule.",
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
    path: "/projects/{id}/merge_requests/{merge_request_iid}/approvals",
  },
});
