import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseById = defineTool({
  name: "cloud:databases:get_database_by_id",
  description: "[Cloud] Get database by id. Returns a specific database.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database to be returned",
      },
      include_collaborators: {
        type: "boolean",
        description: "Includes collaborators on the database.",
      },
      include_direct_children: {
        type: "boolean",
        description: "Includes direct children of the database, as defined in the `ChildrenResponse` object.",
      },
      include_operations: {
        type: "boolean",
        description:
          "Includes operations associated with this database in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
      include_properties: {
        type: "boolean",
        description:
          "Includes content properties associated with this database in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}",
    query: {
      "include-collaborators": "include_collaborators",
      "include-direct-children": "include_direct_children",
      "include-operations": "include_operations",
      "include-properties": "include_properties",
    },
  },
});
