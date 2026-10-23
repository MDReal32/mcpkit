import { defineTool } from "@usemcpkit/core";

export const orgsBillingUpdateBudgetOrg = defineTool({
  name: "orgs:billing:update_budget_org",
  description:
    "Update a budget for an organization. Updates an existing budget for an organization. The authenticated user must be an organization admin or billing manager.",
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
      budget_amount: {
        type: "integer",
        description:
          "The budget amount in whole dollars. For license-based products, this represents the number of licenses.",
      },
      prevent_further_usage: {
        type: "boolean",
        description:
          "Whether to prevent additional spending once the budget is exceeded. For budgets with `user` or `multi_user_customer` scope, this must remain `true`.",
      },
      budget_alerting: {
        type: "object",
        properties: {
          will_alert: {
            type: "boolean",
            description:
              "Whether alerts are enabled for this budget. Ignored for user-scopes as alerting is always disabled for them.",
          },
          alert_recipients: {
            type: "array",
            description:
              "Array of user login names who will receive alerts. Ignored for user-scopes as alerting is always disabled for them.",
            items: {
              type: "string",
            },
          },
        },
      },
      expires_at: {
        description:
          "The date the budget will expire in `YYYY-MM-DD` format. Only dates in the future are accepted. If not set, the budget will not expire. Setting to `null` or `0` will remove the expiration date from a budget if set.",
      },
    },
    required: ["org", "budget_id"],
  },
  request: {
    method: "PATCH",
    path: "/organizations/{org}/settings/billing/budgets/{budget_id}",
    body: ["budget_amount", "prevent_further_usage", "budget_alerting", "expires_at"],
  },
});
