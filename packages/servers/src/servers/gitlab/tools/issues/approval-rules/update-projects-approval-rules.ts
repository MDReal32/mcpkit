import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesUpdateProjectsApprovalRules = defineTool({
  name: "issues:approval_rules:update_projects_approval_rules",
  description:
    "Update an approval rule for a project. Updates a specified approval rule for a project. This endpoint removes any approvers and groups not defined in the `group_ids`, `user_ids`, or `usernames` attributes. Hidden groups (private groups the user does not have permission to view) that are not in the `users` or `groups` parameters are preserved by default. To remove them, set `remove_hidden_groups` to `true`. This ensures hidden groups a…",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      approval_rule_id: {
        type: "integer",
        description: "ID of the approval rule.",
      },
      name: {
        type: "string",
        description: "Name of the approval rule. Limited to 1024 characters.",
      },
      approvals_required: {
        type: "integer",
        description: "Number of required approvals for the rule.",
      },
      users: {
        type: "array",
        description: "IDs of users to add as approvers. Deprecated. Use `user_ids` instead.",
        items: {
          type: "integer",
        },
      },
      user_ids: {
        type: "array",
        description: "IDs of users to add as approvers. When used with `usernames`, both lists of users are added.",
        items: {
          type: "integer",
        },
      },
      groups: {
        type: "array",
        description: "IDs of groups to add as approvers. Deprecated. Use `group_ids` instead.",
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
        description: "Usernames of approvers. If used with `user_ids`, adds both lists of users.",
        items: {
          type: "string",
        },
      },
      protected_branch_ids: {
        type: "array",
        description: "IDs of protected branches to scope the rule by.",
        items: {
          type: "integer",
        },
      },
      applies_to_all_protected_branches: {
        type: "boolean",
        description:
          "If `true`, applies the rule to all protected branches and ignores the `protected_branch_ids` attribute.",
      },
      remove_hidden_groups: {
        type: "boolean",
        description: "If `true`, removes hidden groups from the approval rule.",
      },
      coverage_minimum_threshold: {
        type: "number",
        description:
          "Minimum code coverage percentage for the rule, from 0 to 100. If coverage falls below this threshold, approval is required.",
      },
      vulnerabilities_allowed: {
        type: "integer",
        description: "Number of vulnerabilities allowed for the rule.",
      },
      scanners: {
        type: "array",
        description: "Security scanners to be considered by the approval rule.",
        items: {
          type: "string",
        },
      },
      severity_levels: {
        type: "array",
        description: "Security levels to be considered by the approval rule.",
        items: {
          type: "string",
        },
      },
      vulnerability_states: {
        type: "array",
        description: "Vulnerability states to be considered by the approval rule.",
        items: {
          type: "string",
        },
      },
    },
    required: ["id", "approval_rule_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/approval_rules/{approval_rule_id}",
    body: [
      "name",
      "approvals_required",
      "users",
      "user_ids",
      "groups",
      "group_ids",
      "usernames",
      "protected_branch_ids",
      "applies_to_all_protected_branches",
      "remove_hidden_groups",
      "coverage_minimum_threshold",
      "vulnerabilities_allowed",
      "scanners",
      "severity_levels",
      "vulnerability_states",
    ],
  },
});
