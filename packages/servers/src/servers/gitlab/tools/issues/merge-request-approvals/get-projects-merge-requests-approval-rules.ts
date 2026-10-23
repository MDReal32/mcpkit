import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsGetProjectsMergeRequestsApprovalRules = defineTool({
  name: "issues:merge_request_approvals:get_projects_merge_requests_approval_rules",
  description:
    "Retrieve an approval rule for a specific merge request. Retrieves information about an approval rule for a specified merge request.",
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
      approval_rule_id: {
        type: "integer",
        description: "ID of the merge request approval rule.",
      },
    },
    required: ["id", "merge_request_iid", "approval_rule_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/approval_rules/{approval_rule_id}",
  },
});
