import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesCreateGroupsApprovalRules = defineTool({
  name: "issues:approval_rules:create_groups_approval_rules",
  description:
    "Create an approval rule for a group. Creates an approval rule for a group. Restricted to group administrators. Do not use the `rule_type` field when building approval rules from the API. The field supports these rule types: - `any_approver`: A pre-configured default rule with `approvals_required` set to `0`.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    required: ["id", "name", "approvals_required"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/approval_rules",
    body: ["name", "approvals_required", "rule_type", "user_ids", "group_ids"],
  },
});
