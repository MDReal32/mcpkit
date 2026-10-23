import { defineTool } from "@usemcpkit/core";

export const cloudWhiteboardsGetWhiteboardContentProperties = defineTool({
  name: "cloud:whiteboards:get_whiteboard_content_properties",
  description:
    "[Cloud] Get content properties for whiteboard. Retrieves Content Properties tied to a specified whiteboard.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the whiteboard for which content properties should be returned.",
      },
      key: {
        type: "string",
        description: "Filters the response to return a specific content property with matching key (case sensitive).",
      },
      sort: {
        type: "string",
        description: "Used to sort the result by a particular field.",
        enum: ["key", "-key"],
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/whiteboards/{id}/properties",
    query: ["key", "sort", "cursor", "limit"],
  },
});
