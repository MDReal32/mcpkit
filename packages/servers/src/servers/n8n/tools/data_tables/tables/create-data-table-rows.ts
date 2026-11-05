import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesCreateDataTableRows = defineTool({
  name: "data_tables:tables:create_data_table_rows",
  description: "Insert rows into a data table. Insert one or more rows into a data table.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      data: {
        type: "array",
        description: "Array of rows to insert. Each row is an object with column names as keys.",
        items: {
          type: "object",
        },
      },
      returnType: {
        type: "string",
        description:
          "count: return only the number of rows inserted. id: return an array of objects with the id of each inserted row. all: return the full row data for all inserted rows.",
        default: "count",
      },
    },
    required: ["dataTableId", "data"],
  },
  request: {
    method: "POST",
    path: "/data-tables/{dataTableId}/rows",
    body: ["data", "returnType"],
  },
});
