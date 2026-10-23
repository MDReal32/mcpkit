import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsGetBlogPostOperations = defineTool({
  name: "cloud:blogposts:get_blog_post_operations",
  description:
    "[Cloud] Get permitted operations for blog post. Returns the permitted operations on specific blog post.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the blog post for which operations should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/blogposts/{id}/operations",
  },
});
