import { defineTool } from "@usemcpkit/core";

export const adminMigrationsCreateAdminMigrationsMark = defineTool({
  name: "admin:migrations:create_admin_migrations_mark",
  description:
    "Update status of a migration. Updates the status of a migration to indicate a successful execution. This prevent them from being executed by the `db:migrate` tasks. Use this API to skip failing migrations after you determine they are safe to skip.",
  input: {
    type: "object",
    properties: {
      timestamp: {
        type: "integer",
        description: "Version timestamp of the migration.",
      },
      database: {
        type: "string",
        description: "Database name for which the migration is skipped.",
        default: "main",
        enum: ["main", "ci", "sec", "embedding", "geo"],
      },
    },
    required: ["timestamp"],
  },
  request: {
    method: "POST",
    path: "/admin/migrations/{timestamp}/mark",
    body: ["database"],
  },
});
