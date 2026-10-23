import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesCreateProjectsApprovalSettingsRules = defineTool({
  name: "issues:approval_rules:create_projects_approval_settings_rules",
  description: "Create new approval rule. Private API subject to change",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
        description: "Type of the approval rule. Possible values are `regular`, `report_approver`, and `any_approver`.",
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
        default: false,
      },
      report_type: {
        type: "string",
        description: "Type of the report required when `rule_type` is set to `report_approver`.",
        enum: ["code_coverage"],
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
    required: ["id", "name", "approvals_required"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/approval_settings/rules",
    body: [
      "name",
      "approvals_required",
      "rule_type",
      "users",
      "user_ids",
      "groups",
      "group_ids",
      "usernames",
      "protected_branch_ids",
      "applies_to_all_protected_branches",
      "report_type",
      "coverage_minimum_threshold",
      "vulnerabilities_allowed",
      "scanners",
      "severity_levels",
      "vulnerability_states",
    ],
  },
});
