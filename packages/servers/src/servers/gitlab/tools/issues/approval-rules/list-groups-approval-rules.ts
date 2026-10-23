import { defineTool } from "@usemcpkit/core";

export const issuesApprovalRulesListGroupsApprovalRules = defineTool({
  name: "issues:approval_rules:list_groups_approval_rules",
  description:
    "List all approval rules for a group. Lists all approval rules and any associated details for a specified group. Restricted to group administrators. Use the `page` and `per_page` pagination parameters to restrict the list of approval rules.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    path: "/groups/{id}/approval_rules",
    query: ["page", "per_page"],
  },
});
