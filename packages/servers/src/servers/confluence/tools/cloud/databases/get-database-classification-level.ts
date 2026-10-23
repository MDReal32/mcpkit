import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseClassificationLevel = defineTool({
  name: "cloud:databases:get_database_classification_level",
  description: "[Cloud] Get database classification level. Returns the classification level for a specific database.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database for which classification level should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}/classification-level",
  },
});
