import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesDeleteDataTable = defineTool({
  name: "data_tables:tables:delete_data_table",
  description: "Delete a data table. Delete a data table. This will also delete all rows in the table.",
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
    path: "/data-tables/{dataTableId}",
  },
});
