import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesDeleteProjectsApprovalSettingsRules = defineTool({
  name: "issues:approval_rules:delete_projects_approval_settings_rules",
  description: "Delete an approval rule. Private API subject to change",
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
    },
    required: ["id", "approval_rule_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/approval_settings/rules/{approval_rule_id}",
  },
});
