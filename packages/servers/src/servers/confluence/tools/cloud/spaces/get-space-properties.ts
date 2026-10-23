import { defineTool } from "@usemcpkit/core";

export const cloudSpacesGetSpaceProperties = defineTool({
  name: "cloud:spaces:get_space_properties",
  description:
    "[Cloud] Get space properties in space. Returns all properties for the given space. Space properties are a key-value storage associated with a space. The limit parameter specifies the maximum number of results returned in a single response. Use the `link` response header to paginate through additional results.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "integer",
        description: "The ID of the space for which space properties should be returned.",
      },
      key: {
        type: "string",
        description:
          "The key of the space property to retrieve. This should be used when a user knows the key of their property, but needs to retrieve the id for use in other methods.",
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/spaces/{space_id}/properties",
    query: ["key", "cursor", "limit"],
  },
});
