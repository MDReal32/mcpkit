import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesClearDataTableRows = defineTool({
  name: "data_tables:tables:clear_data_table_rows",
  description:
    "Clear all rows from a data table. Permanently delete all rows from a data table. The table structure is retained. This action cannot be undone.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
    },
    required: ["dataTableId"],
  },
  request: {
    method: "DELETE",
    path: "/data-tables/{dataTableId}/rows/clear",
  },
});
