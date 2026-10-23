import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsListReposForAuthenticatedUser = defineTool({
  name: "orgs:migrations:list_repos_for_authenticated_user",
  description: "List repositories for a user migration. Lists all the repositories for this user migration.",
  input: {
    type: "object",
    properties: {
      migration_id: {
        type: "integer",
        description: "The unique identifier of the migration.",
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
    required: ["migration_id"],
  },
  request: {
    method: "GET",
    path: "/user/migrations/{migration_id}/repositories",
    query: ["per_page", "page"],
  },
});
