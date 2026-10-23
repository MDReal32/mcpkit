import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseContentPropertiesById = defineTool({
  name: "cloud:databases:get_database_content_properties_by_id",
  description:
    "[Cloud] Get content property for database by id. Retrieves a specific Content Property by ID that is attached to a specified database.",
  input: {
    type: "object",
    properties: {
      database_id: {
        type: "integer",
        description: "The ID of the database for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the content property being requested.",
      },
    },
    required: ["database_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{database_id}/properties/{property_id}",
  },
});
