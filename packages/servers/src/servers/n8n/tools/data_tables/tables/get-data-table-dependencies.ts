import { defineTool } from "@usemcpkit/core";

export const data_tablesTablesGetDataTableDependencies = defineTool({
  name: "data_tables:tables:get_data_table_dependencies",
  description: "List data table dependencies. List the workflows that use the data table.",
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
    },
    required: ["dataTableId"],
  },
  request: {
    method: "GET",
    path: "/data-tables/{dataTableId}/dependencies",
    query: ["limit", "cursor"],
  },
});
