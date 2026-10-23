import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetActionsCacheStorageLimitForOrganization = defineTool({
  name: "actions:actions:set_actions_cache_storage_limit_for_organization",
  description:
    "Set GitHub Actions cache storage limit for an organization. Sets GitHub Actions cache storage limit for an organization. All organizations and repositories under this organization may not set a higher cache storage limit.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      max_cache_size_gb: {
        type: "integer",
        description:
          "For repositories in the organization, the maximum size limit for the sum of all caches in a repository, in gigabytes.",
      },
    },
    required: ["org"],
  },
  request: {
    method: "PUT",
    path: "/organizations/{org}/actions/cache/storage-limit",
    body: ["max_cache_size_gb"],
  },
});
