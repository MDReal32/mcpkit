import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesListDataTables = defineTool({
  name: "data_tables:tables:list_data_tables",
  description:
    "List all data tables. Retrieve a list of all data tables with optional filtering, sorting, and pagination. Each table includes `sizeBytes`, the value the `size` sort option orders by.",
  input: {
    type: "object",
    properties: {
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
        enum: [
          "name:asc",
          "name:desc",
          "createdAt:asc",
          "createdAt:desc",
          "updatedAt:asc",
          "updatedAt:desc",
          "size:asc",
          "size:desc",
        ],
        description: "Sort format: field:asc or field:desc",
      },
    },
  },
  request: {
    method: "GET",
    path: "/data-tables",
    query: ["limit", "cursor", "filter", "sortBy"],
  },
});
