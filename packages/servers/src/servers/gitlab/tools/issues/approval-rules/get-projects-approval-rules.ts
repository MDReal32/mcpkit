import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesGetProjectsApprovalRules = defineTool({
  name: "issues:approval_rules:get_projects_approval_rules",
  description:
    "Retrieve an approval rule for a project. Retrieves information about a specified approval rule for a project.",
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
    method: "GET",
    path: "/projects/{id}/approval_rules/{approval_rule_id}",
  },
});
