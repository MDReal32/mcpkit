import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseDescendants = defineTool({
  name: "cloud:databases:get_database_descendants",
  description:
    "[Cloud] Get descendants of a database. Returns descendants in the content tree for a given database by ID in top-to-bottom order (that is, the highest descendant is the first item in the response payload). The number of results is limited by the `limit` parameter and additional results (if available) will be available by calling this endpoint with the cursor in the response payload. There is also a `depth` parameter specifying depth o…",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the database.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of items per result to return. If more results exist, call the endpoint with the cursor to fetch the next set of results.",
      },
      depth: {
        type: "integer",
        description:
          "Maximum depth of descendants to return. If more results are required, use the endpoint corresponding to the content type of the deepest descendant to fetch more descendants.",
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}/descendants",
    query: ["limit", "depth", "cursor"],
  },
});
