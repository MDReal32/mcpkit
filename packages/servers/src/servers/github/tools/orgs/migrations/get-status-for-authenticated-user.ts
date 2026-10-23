import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsGetStatusForAuthenticatedUser = defineTool({
  name: "orgs:migrations:get_status_for_authenticated_user",
  description:
    "Get a user migration status. Fetches a single user migration. The response includes the `state` of the migration, which can be one of the following values:",
  input: {
    type: "object",
    properties: {
      migration_id: {
        type: "integer",
        description: "The unique identifier of the migration.",
      },
      exclude: {
        type: "string",
        description: "(comma-separated)",
      },
    },
    required: ["migration_id"],
  },
  request: {
    method: "GET",
    path: "/user/migrations/{migration_id}",
    query: ["exclude"],
  },
});
