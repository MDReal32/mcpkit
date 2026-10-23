import { defineTool } from "@usemcpkit/core";

export const issuesMergeRequestApprovalsUpdateProjectsMergeRequestsApprovalRules = defineTool({
  name: "issues:merge_request_approvals:update_projects_merge_requests_approval_rules",
  description:
    "Update an approval rule for a merge request. Updates a specified approval rule for a merge request. This endpoint removes any approvers and groups not included in the `group_ids`, `user_ids`, or `usernames` attributes. The `report_approver` or `code_owner` rules are system-generated, and you cannot edit them.",
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
      name: {
        type: "string",
        description: "Name of the approval rule. Limited to 1024 characters.",
      },
      approvals_required: {
        type: "integer",
        description: "Number of required approvals for the rule.",
      },
      user_ids: {
        type: "array",
        description: "IDs of users to add as approvers. If used with `usernames`, adds both lists of users.",
        items: {
          type: "integer",
        },
      },
      group_ids: {
        type: "array",
        description: "IDs of groups to add as approvers.",
        items: {
          type: "integer",
        },
      },
      usernames: {
        type: "array",
        description: "Usernames of users to add as approvers. If used with `user_ids`, adds both lists of users.",
        items: {
          type: "string",
        },
      },
      remove_hidden_groups: {
        type: "boolean",
        description: "If `true`, removes hidden groups.",
      },
    },
    required: ["id", "merge_request_iid", "approval_rule_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/approval_rules/{approval_rule_id}",
    body: ["name", "approvals_required", "user_ids", "group_ids", "usernames", "remove_hidden_groups"],
  },
});
