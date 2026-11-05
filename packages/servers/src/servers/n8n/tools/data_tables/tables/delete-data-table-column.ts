import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesDeleteDataTableColumn = defineTool({
  name: "data_tables:tables:delete_data_table_column",
  description: "Delete a column. Remove a column from a data table. This will also delete all data in the column.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      columnId: {
        type: "string",
        description: "The ID of the column",
      },
    },
    required: ["dataTableId", "columnId"],
  },
  request: {
    method: "DELETE",
    path: "/data-tables/{dataTableId}/columns/{columnId}",
  },
});
