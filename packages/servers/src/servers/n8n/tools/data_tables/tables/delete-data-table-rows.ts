import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesDeleteDataTableRows = defineTool({
  name: "data_tables:tables:delete_data_table_rows",
  description:
    "Delete rows from a data table. Delete rows matching filter conditions from a data table. Filter is required to prevent accidental deletion of all data.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      filter: {
        type: "string",
        description: "JSON string of filter conditions. Required to prevent accidental deletion of all data.",
      },
      returnData: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
        description: "If true, return the deleted rows. If false, return true on success.",
      },
      dryRun: {
        type: "string",
        default: "false",
        enum: ["true", "false"],
        description: "If true, preview which rows would be deleted without actually deleting them.",
      },
    },
    required: ["dataTableId", "filter"],
  },
  request: {
    method: "DELETE",
    path: "/data-tables/{dataTableId}/rows/delete",
    query: ["filter", "returnData", "dryRun"],
  },
});
