import { defineTool } from "@usemcpkit/core";

export const cloudAttachmentsGetAttachments = defineTool({
  name: "cloud:attachments:get_attachments",
  description:
    "[Cloud] Get attachments. Returns all attachments. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.",
  input: {
    type: "object",
    properties: {
      sort: {
        type: "string",
        description: "Used to sort the result by a particular field.",
        enum: ["created-date", "-created-date", "modified-date", "-modified-date"],
      },
      cursor: {
        type: "string",
        description:
          "Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.",
      },
      status: {
        type: "string",
        description:
          "Filter the results to attachments based on their status. By default, `current` and `archived` are used. (comma-separated)",
      },
      mediaType: {
        type: "string",
        description: "Filters on the mediaType of attachments. Only one may be specified.",
      },
      filename: {
        type: "string",
        description: "Filters on the file-name of attachments. Only one may be specified.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of attachments per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/attachments",
    query: ["sort", "cursor", "status", "mediaType", "filename", "limit"],
  },
});
