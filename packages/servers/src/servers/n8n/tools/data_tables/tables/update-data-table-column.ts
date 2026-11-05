import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesUpdateDataTableColumn = defineTool({
  name: "data_tables:tables:update_data_table_column",
  description: "Update a column. Rename and/or reorder a column in a data table.",
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
      name: {
        type: "string",
        description:
          "Column name. Must start with a letter; only letters, digits, and underscores after that; maximum 63 characters.",
      },
      index: {
        type: "integer",
        description: "New zero-based position for the column",
      },
    },
    required: ["dataTableId", "columnId"],
  },
  request: {
    method: "PATCH",
    path: "/data-tables/{dataTableId}/columns/{columnId}",
    body: ["name", "index"],
  },
});
