import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsDeleteArchiveForAuthenticatedUser = defineTool({
  name: "orgs:migrations:delete_archive_for_authenticated_user",
  description:
    "Delete a user migration archive. Deletes a previous migration archive. Downloadable migration archives are automatically deleted after seven days. Migration metadata, which is returned in the List user migrations and Get a user migration status endpoints, will continue to be available even after an archive is deleted.",
  input: {
    type: "object",
    properties: {
      migration_id: {
        type: "integer",
        description: "The unique identifier of the migration.",
      },
    },
    required: ["migration_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/migrations/{migration_id}/archive",
  },
});
