import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetActionsCacheRetentionLimitForOrganization = defineTool({
  name: "actions:actions:get_actions_cache_retention_limit_for_organization",
  description:
    "Get GitHub Actions cache retention limit for an organization. Gets GitHub Actions cache retention limit for an organization. All repositories under this organization may not set a higher cache retention limit.",
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
    path: "/organizations/{org}/actions/cache/retention-limit",
  },
});
