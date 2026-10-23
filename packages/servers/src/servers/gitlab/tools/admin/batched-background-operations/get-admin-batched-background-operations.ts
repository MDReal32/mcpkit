import { defineTool } from "@usemcpkit/core";

export const adminBatchedBackgroundOperationsGetAdminBatchedBackgroundOperations = defineTool({
  name: "admin:batched_background_operations:get_admin_batched_background_operations",
  description: "Retrieve a batched background operation. This feature was introduced in GitLab 19.1.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the batched background operation.",
      },
      database: {
        type: "string",
        default: "main",
        enum: ["main", "ci", "sec", "embedding", "geo"],
        description: "Name of the database.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/admin/batched_background_operations/{id}",
    query: ["database"],
  },
});
