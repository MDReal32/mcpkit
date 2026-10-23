import { defineTool } from "@usemcpkit/core";

export const cloudCommentsGetCommentContentPropertiesById = defineTool({
  name: "cloud:comments:get_comment_content_properties_by_id",
  description:
    "[Cloud] Get content property for comment by id. Retrieves a specific Content Property by ID that is attached to a specified comment.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "integer",
        description: "The ID of the comment for which content properties should be returned.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the content property being requested.",
      },
    },
    required: ["comment_id", "property_id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/comments/{comment_id}/properties/{property_id}",
  },
});
