import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseRestrictionState = defineTool({
  name: "cloud:databases:get_database_restriction_state",
  description: "[Cloud] Get database restriction state. Returns the restriction state of a database.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}/restriction-state",
  },
});
