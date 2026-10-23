import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsCreateBlogpostProperty = defineTool({
  name: "cloud:blogposts:create_blogpost_property",
  description: "[Cloud] Create content property for blog post. Creates a new property for a blogpost.",
  input: {
    type: "object",
    properties: {
      blogpost_id: {
        type: "integer",
        description: "The ID of the blog post to create a property for.",
      },
      key: {
        type: "string",
        description: "Key of the content property",
      },
      value: {
        description: "Value of the content property.",
      },
    },
    required: ["blogpost_id"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/blogposts/{blogpost_id}/properties",
    body: ["key", "value"],
  },
});
