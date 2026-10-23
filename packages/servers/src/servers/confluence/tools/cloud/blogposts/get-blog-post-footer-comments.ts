import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsGetBlogPostFooterComments = defineTool({
  name: "cloud:blogposts:get_blog_post_footer_comments",
  description:
    "[Cloud] Get footer comments for blog post. Returns the root footer comments of specific blog post. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the blog post for which footer comments should be returned.",
      },
      body_format: {
        type: "string",
        description:
          "The content format type to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.",
        enum: ["storage", "atlas_doc_format"],
      },
      status: {
        type: "string",
        description: "Filter the footer comment being retrieved by its status. (comma-separated)",
      },
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
      limit: {
        type: "integer",
        description:
          "Maximum number of footer comments per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/blogposts/{id}/footer-comments",
    query: {
      "body-format": "body_format",
      status: "status",
      sort: "sort",
      cursor: "cursor",
      limit: "limit",
    },
  },
});
