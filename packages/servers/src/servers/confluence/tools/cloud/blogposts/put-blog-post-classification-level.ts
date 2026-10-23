import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsPutBlogPostClassificationLevel = defineTool({
  name: "cloud:blogposts:put_blog_post_classification_level",
  description:
    "[Cloud] Update blog post classification level. Updates the classification level for a specific blog post.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the blog post for which classification level should be updated.",
      },
      body_id: {
        type: "string",
        description: "The ID of the classification level.",
      },
      status: {
        type: "string",
        description: "Status of the content.",
        enum: ["current", "draft"],
      },
    },
    required: ["id", "body_id", "status"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/blogposts/{id}/classification-level",
    body: {
      id: "body_id",
      status: "status",
    },
  },
});
