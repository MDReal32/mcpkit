import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetActionsCacheUsageForOrg = defineTool({
  name: "actions:actions:get_actions_cache_usage_for_org",
  description:
    "Get GitHub Actions cache usage for an organization. Gets the total GitHub Actions cache usage for an organization. The data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/cache/usage",
  },
});
