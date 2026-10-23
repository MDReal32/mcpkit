import { defineTool } from "@usemcpkit/core";

export const cloudInlineCommentsGetInlineCommentVersionDetails = defineTool({
  name: "cloud:inline_comments:get_inline_comment_version_details",
  description:
    "[Cloud] Get version details for inline comment version. Retrieves version details for the specified inline comment version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the inline comment for which version details should be returned.",
      },
      version_number: {
        type: "integer",
        description: "The version number of the inline comment to be returned.",
      },
    },
    required: ["id", "version_number"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/inline-comments/{id}/versions/{version_number}",
  },
});
