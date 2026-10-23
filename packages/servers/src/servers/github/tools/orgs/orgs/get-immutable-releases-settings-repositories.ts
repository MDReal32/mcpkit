import { defineTool } from "@usemcpkit/core";

export const orgsOrgsGetImmutableReleasesSettingsRepositories = defineTool({
  name: "orgs:orgs:get_immutable_releases_settings_repositories",
  description:
    "List selected repositories for immutable releases enforcement. List all of the repositories that have been selected for immutable releases enforcement in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["org"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/settings/immutable-releases/repositories",
    query: ["page", "per_page"],
  },
});
