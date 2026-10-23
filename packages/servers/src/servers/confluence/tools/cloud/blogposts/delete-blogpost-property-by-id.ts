import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsDeleteBlogpostPropertyById = defineTool({
  name: "cloud:blogposts:delete_blogpost_property_by_id",
  description:
    "[Cloud] Delete content property for blogpost by id. Deletes a content property for a blogpost by its id.",
  input: {
    type: "object",
    properties: {
      blogpost_id: {
        type: "integer",
        description: "The ID of the blog post the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["blogpost_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/blogposts/{blogpost_id}/properties/{property_id}",
  },
});
