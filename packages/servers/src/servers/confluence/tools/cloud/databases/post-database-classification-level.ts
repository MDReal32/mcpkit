import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesPostDatabaseClassificationLevel = defineTool({
  name: "cloud:databases:post_database_classification_level",
  description:
    "[Cloud] Reset database classification level. Resets the classification level for a specific database for the space default classification level.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database for which classification level should be updated.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current"],
      },
    },
    required: ["id", "status"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/databases/{id}/classification-level/reset",
    body: ["status"],
  },
});
