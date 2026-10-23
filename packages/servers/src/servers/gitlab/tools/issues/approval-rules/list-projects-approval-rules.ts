import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesListProjectsApprovalRules = defineTool({
  name: "issues:approval_rules:list_projects_approval_rules",
  description:
    "List all approval rules for a project. Lists all approval rules and any associated details for a specified project. To restrict the list of approval rules, use the `page` and `per_page` pagination parameters.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/approval_rules",
    query: ["page", "per_page"],
  },
});
