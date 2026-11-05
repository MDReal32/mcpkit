import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesGetDataTable = defineTool({
  name: "data_tables:tables:get_data_table",
  description: "Get a data table. Retrieve a specific data table by ID.",
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
    path: "/data-tables/{dataTableId}",
  },
});
