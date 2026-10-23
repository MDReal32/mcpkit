import { defineTool } from "@usemcpkit/core";

export const adminBatchedBackgroundMigrationsUpdateAdminBatchedBackgroundMigrationsResume = defineTool({
  name: "admin:batched_background_migrations:update_admin_batched_background_migrations_resume",
  description:
    "Resume a batched background migration. Resumes execution of a previously paused batched background migration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the batched background migration.",
      },
      database: {
        type: "string",
        description: "Name of the database.",
        default: "main",
        enum: ["main", "ci", "sec", "embedding", "geo"],
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/admin/batched_background_migrations/{id}/resume",
    body: ["database"],
  },
});
