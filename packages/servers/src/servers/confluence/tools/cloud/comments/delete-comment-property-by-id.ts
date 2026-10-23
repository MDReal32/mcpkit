import { defineTool } from "@usemcpkit/core";

export const cloudCommentsDeleteCommentPropertyById = defineTool({
  name: "cloud:comments:delete_comment_property_by_id",
  description: "[Cloud] Delete content property for comment by id. Deletes a content property for a comment by its id.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "integer",
        description: "The ID of the comment the property belongs to.",
      },
      property_id: {
        type: "integer",
        description: "The ID of the property to be deleted.",
      },
    },
    required: ["comment_id", "property_id"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/api/v2/comments/{comment_id}/properties/{property_id}",
  },
});
