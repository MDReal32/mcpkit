import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesUpsertDataTableRow = defineTool({
  name: "data_tables:tables:upsert_data_table_row",
  description:
    "Upsert a row in a data table. Update an existing row, or insert a new one if no row matches the filter conditions.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      filter: {
        type: "object",
        description: "Filter conditions to match an existing row. If no row matches, n8n inserts a new row.",
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
        description: "Column values for the row",
      },
      returnData: {
        type: "boolean",
        description:
          "Set to true to return the upserted row(s): the matching rows if updated, or the new row if one was inserted. Set to false to return true on success.",
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
    method: "POST",
    path: "/data-tables/{dataTableId}/rows/upsert",
    body: ["filter", "data", "returnData", "dryRun"],
  },
});
