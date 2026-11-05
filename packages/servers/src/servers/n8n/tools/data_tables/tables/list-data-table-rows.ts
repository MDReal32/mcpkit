import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesListDataTableRows = defineTool({
  name: "data_tables:tables:list_data_table_rows",
  description:
    "List rows of a data table. Retrieve rows from a data table with optional filtering, sorting, and pagination.",
  input: {
    type: "object",
    properties: {
      dataTableId: {
        type: "string",
        description: "The ID of the data table",
      },
      limit: {
        type: "number",
        default: 100,
        description: "The maximum number of items to return.",
      },
      cursor: {
        type: "string",
        description:
          'Paginate by setting the cursor parameter to the nextCursor attribute returned by the previous request\'s response. Default value fetches the first "page" of the collection. See pagination for more detail.',
      },
      filter: {
        type: "string",
        description: "JSON string of filter conditions",
      },
      sortBy: {
        type: "string",
        description: "Sort format: columnName:asc or columnName:desc",
      },
      search: {
        type: "string",
        description: "Search text across all string columns",
      },
    },
    required: ["dataTableId"],
  },
  request: {
    method: "GET",
    path: "/data-tables/{dataTableId}/rows",
    query: ["limit", "cursor", "filter", "sortBy", "search"],
  },
});
