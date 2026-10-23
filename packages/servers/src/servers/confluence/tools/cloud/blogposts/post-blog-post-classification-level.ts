import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsPostBlogPostClassificationLevel = defineTool({
  name: "cloud:blogposts:post_blog_post_classification_level",
  description:
    "[Cloud] Reset blog post classification level. Resets the classification level for a specific blog post for the space default classification level.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the blog post for which classification level should be updated.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current", "draft"],
      },
    },
    required: ["id", "status"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/blogposts/{id}/classification-level/reset",
    body: ["status"],
  },
});
