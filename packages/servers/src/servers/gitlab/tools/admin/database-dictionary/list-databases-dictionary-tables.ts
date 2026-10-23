import { defineTool } from "@usemcpkit/core";

export const adminDatabaseDictionaryListDatabasesDictionaryTables = defineTool({
  name: "admin:database_dictionary:list_databases_dictionary_tables",
  description:
    "List dictionary tables. Returns database dictionary tables filtered by database and optional table size",
  input: {
    type: "object",
    properties: {
      database_name: {
        type: "string",
        enum: ["main", "ci", "sec", "embedding", "geo"],
        description: "Name of the database.",
      },
      table_size: {
        type: "string",
        enum: ["small", "medium", "large", "over_limit"],
        description: "Filter by table size classification.",
      },
    },
    required: ["database_name"],
  },
  request: {
    method: "GET",
    path: "/databases/{database_name}/dictionary/tables",
    query: ["table_size"],
  },
});
