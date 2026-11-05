import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesCreateDataTable = defineTool({
  name: "data_tables:tables:create_data_table",
  description:
    "Create a new data table. Create a new data table in your personal project or a team project you have access to.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the data table",
      },
      columns: {
        type: "array",
        description: "Column definitions for the table",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Column name",
            },
            type: {
              type: "string",
              description: "Column data type",
              enum: ["string", "number", "boolean", "date"],
            },
            csvColumnName: {
              type: "string",
              description:
                "Name of the CSV column to read the values from. If you do not set it, n8n maps the CSV columns by position.",
            },
          },
          required: ["name", "type"],
        },
      },
      projectId: {
        type: "string",
        description:
          "ID of the project to create the table in. When omitted, the table is created in the user's personal project.",
      },
      fileId: {
        type: "string",
        description:
          "ID of a CSV file that you uploaded in the n8n editor. If you set it, n8n fills the new table with the rows from that file. Only a session-authenticated caller can upload a file, so an API-key caller cannot use this field.",
      },
      hasHeaders: {
        type: "boolean",
        description:
          "Set to true if the first row of the CSV file holds the column names. Applies only when you set `fileId`. The default is true.",
      },
    },
    required: ["name", "columns"],
  },
  request: {
    method: "POST",
    path: "/data-tables",
    body: ["name", "columns", "projectId", "fileId", "hasHeaders"],
  },
});
