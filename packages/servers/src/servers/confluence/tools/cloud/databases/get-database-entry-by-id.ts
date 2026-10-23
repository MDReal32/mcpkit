import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseEntryById = defineTool({
  name: "cloud:databases:get_database_entry_by_id",
  description: "[Cloud] Get entry by id. Returns a single entry (row) from a database by ID.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The Confluence content ID of the database, represented as an ASCII decimal-digit string.",
      },
      entryId: {
        type: "string",
        description: "The ID of the entry to be returned.",
      },
    },
    required: ["id", "entryId"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}/entries/{entryId}",
  },
});
