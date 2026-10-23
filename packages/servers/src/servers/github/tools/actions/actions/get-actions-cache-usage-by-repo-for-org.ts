import { defineTool } from "@usemcpkit/core";

export const actionsActionsGetActionsCacheUsageByRepoForOrg = defineTool({
  name: "actions:actions:get_actions_cache_usage_by_repo_for_org",
  description:
    "List repositories with GitHub Actions cache usage for an organization. Lists repositories and their GitHub Actions cache usage for an organization. The data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/actions/cache/usage-by-repository",
    query: ["per_page", "page"],
  },
});
