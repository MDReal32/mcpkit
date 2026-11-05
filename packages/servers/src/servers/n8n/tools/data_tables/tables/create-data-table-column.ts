import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesCreateDataTableColumn = defineTool({
  name: "data_tables:tables:create_data_table_column",
  description: "Add a column to a data table. Add a new column to an existing data table.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      name: {
        type: "string",
        description:
          "Column name. Must start with a letter; only letters, digits, and underscores after that; maximum 63 characters.",
      },
      type: {
        type: "string",
        description: "Column data type",
        enum: ["string", "number", "boolean", "date"],
      },
      index: {
        type: "integer",
        description: "Column position (optional, appended to end if omitted)",
      },
    },
    required: ["dataTableId", "name", "type"],
  },
  request: {
    method: "POST",
    path: "/data-tables/{dataTableId}/columns",
    body: ["name", "type", "index"],
  },
});
