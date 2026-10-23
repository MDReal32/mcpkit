import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsGetBlogPostLikeCount = defineTool({
  name: "cloud:blogposts:get_blog_post_like_count",
  description: "[Cloud] Get like count for blog post. Returns the count of likes of specific blog post.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the blog post for which like count should be returned.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/blogposts/{id}/likes/count",
  },
});
