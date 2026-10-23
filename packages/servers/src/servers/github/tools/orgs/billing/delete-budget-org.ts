import { defineTool } from "@usemcpkit/core";

export const orgsBillingDeleteBudgetOrg = defineTool({
  name: "orgs:billing:delete_budget_org",
  description:
    "Delete a budget for an organization. Deletes a budget by ID for an organization. The authenticated user must be an organization admin or billing manager.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      budget_id: {
        type: "string",
        description: "The ID corresponding to the budget.",
      },
    },
    required: ["org", "budget_id"],
  },
  request: {
    method: "DELETE",
    path: "/organizations/{org}/settings/billing/budgets/{budget_id}",
  },
});
