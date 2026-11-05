import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesUpdateDataTable = defineTool({
  name: "data_tables:tables:update_data_table",
  description: "Update a data table. Update a data table's name.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      name: {
        type: "string",
        description: "New name for the data table",
      },
    },
    required: ["dataTableId", "name"],
  },
  request: {
    method: "PATCH",
    path: "/data-tables/{dataTableId}",
    body: ["name"],
  },
});
