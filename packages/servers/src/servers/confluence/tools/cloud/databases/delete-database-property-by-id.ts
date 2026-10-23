import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesDeleteDatabasePropertyById = defineTool({
  name: "cloud:databases:delete_database_property_by_id",
  description:
    "[Cloud] Delete content property for database by id. Deletes a content property for a database by its id.",
  input: {
    type: "object",
    properties: {
      database_id: {
        type: "integer",
        description: "The ID of the database the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["database_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/databases/{database_id}/properties/{property_id}",
  },
});
