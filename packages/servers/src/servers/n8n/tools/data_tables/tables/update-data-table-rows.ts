import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesUpdateDataTableRows = defineTool({
  name: "data_tables:tables:update_data_table_rows",
  description: "Update rows in a data table. Update rows matching filter conditions in a data table.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      filter: {
        type: "object",
        description: "Filter conditions to match rows for update.",
        properties: {
          type: {
            type: "string",
            default: "and",
          },
          filters: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
        required: ["filters"],
      },
      data: {
        type: "object",
        description: "Column values to update",
      },
      returnData: {
        type: "boolean",
        description: "Set to true to return the updated row(s). Set to false to return true on success.",
        default: false,
      },
      dryRun: {
        type: "boolean",
        description: "Set to true to preview the change without saving it.",
        default: false,
      },
    },
    required: ["dataTableId", "filter", "data"],
  },
  request: {
    method: "PATCH",
    path: "/data-tables/{dataTableId}/rows/update",
    body: ["filter", "data", "returnData", "dryRun"],
  },
});
