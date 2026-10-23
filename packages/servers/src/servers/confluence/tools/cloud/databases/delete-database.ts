import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesDeleteDatabase = defineTool({
  name: "cloud:databases:delete_database",
  description: "[Cloud] Delete database. Delete a database by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database to be deleted.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/databases/{id}",
  },
});
