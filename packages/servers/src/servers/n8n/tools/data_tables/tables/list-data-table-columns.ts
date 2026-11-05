import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesListDataTableColumns = defineTool({
  name: "data_tables:tables:list_data_table_columns",
  description: "List columns of a data table. Retrieve all columns for a specific data table.",
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
    method: "GET",
    path: "/data-tables/{dataTableId}/columns",
  },
});
