import { defineTool } from "@usemcpkit/core";

export const orgsBillingGetGithubBillingUsageSummaryReportUser = defineTool({
  name: "orgs:billing:get_github_billing_usage_summary_report_user",
  description:
    "Get billing usage summary for a user. > [!NOTE] > This endpoint is in public preview and is subject to change.",
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
      repository: {
        type: "string",
        description: "The repository name to query for usage in the format owner/repository.",
      },
      product: {
        type: "string",
        description: "The product name to query usage for. The name is not case sensitive.",
      },
      sku: {
        type: "string",
        description: "The SKU to query for usage.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/settings/billing/usage/summary",
    query: ["year", "month", "day", "repository", "product", "sku"],
  },
});
