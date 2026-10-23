import { defineTool } from "@usemcpkit/core";

export const orgsBillingGetGithubBillingPremiumRequestUsageReportUser = defineTool({
  name: "orgs:billing:get_github_billing_premium_request_usage_report_user",
  description:
    "Get billing premium request usage report for a user. Gets a report of premium request usage for a user.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      year: {
        type: "integer",
        description:
          "If specified, only return results for a single year. The value of `year` is an integer with four digits representing a year. For example, `2025`. Default value is the current year.",
      },
      month: {
        type: "integer",
        description:
          "If specified, only return results for a single month. The value of `month` is an integer between `1` and `12`. Default value is the current month. If no year is specified the default `year` is used.",
      },
      day: {
        type: "integer",
        description:
          "If specified, only return results for a single day. The value of `day` is an integer between `1` and `31`. If no `year` or `month` is specified, the default `year` and `month` are used.",
      },
      model: {
        type: "string",
        description: "The model name to query usage for. The name is not case sensitive.",
      },
      product: {
        type: "string",
        description: "The product name to query usage for. The name is not case sensitive.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/settings/billing/premium_request/usage",
    query: ["year", "month", "day", "model", "product"],
  },
});
