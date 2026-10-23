import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsGetBlogpostContentPropertiesById = defineTool({
  name: "cloud:blogposts:get_blogpost_content_properties_by_id",
  description:
    "[Cloud] Get content property for blog post by id. Retrieves a specific Content Property by ID that is attached to a specified blog post.",
  input: {
    type: "object",
    properties: {
      blogpost_id: {
        type: "integer",
        description: "The ID of the blog post for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property being requested",
      },
    },
    required: ["blogpost_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/blogposts/{blogpost_id}/properties/{property_id}",
  },
});
