import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesUpdateGroupsApprovalRules = defineTool({
  name: "issues:approval_rules:update_groups_approval_rules",
  description: "Update group approval rule. Updates an approval rule for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      approval_rule_id: {
        type: "integer",
        description: "ID of the group approval rule.",
      },
      name: {
        type: "string",
        description: "Name of the approval rule. Limited to 1024 characters.",
      },
      approvals_required: {
        type: "integer",
        description: "Number of required approvals for the rule.",
      },
      rule_type: {
        type: "string",
        description: "Type of the approval rule.",
      },
      user_ids: {
        type: "array",
        description: "IDs of users to add as approvers for this rule.",
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
    },
    required: ["id", "approval_rule_id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/approval_rules/{approval_rule_id}",
    body: ["name", "approvals_required", "rule_type", "user_ids", "group_ids"],
  },
});
