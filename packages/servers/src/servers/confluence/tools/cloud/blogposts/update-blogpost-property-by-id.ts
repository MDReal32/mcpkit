import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsUpdateBlogpostPropertyById = defineTool({
  name: "cloud:blogposts:update_blogpost_property_by_id",
  description:
    "[Cloud] Update content property for blog post by id. Update a content property for blog post by its id.",
  input: {
    type: "object",
    properties: {
      blogpost_id: {
        type: "integer",
        description: "The ID of the blog post the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be updated.",
      },
      key: {
        type: "string",
        description: "Key of the content property",
      },
      value: {
        description: "Value of the content property.",
      },
      version: {
        type: "object",
        description: "New version number and associated message",
        properties: {
          number: {
            type: "integer",
            description: "Version number of the new version. Should be 1 more than the current version number.",
          },
          message: {
            type: "string",
            description: "Message to be associated with the new version.",
          },
        },
      },
    },
    required: ["blogpost_id", "property_id"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/blogposts/{blogpost_id}/properties/{property_id}",
    body: ["key", "value", "version"],
  },
});
