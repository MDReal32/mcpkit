import { defineTool } from "@usemcpkit/core";

export const cloudFooterCommentsGetFooterCommentVersionDetails = defineTool({
  name: "cloud:footer_comments:get_footer_comment_version_details",
  description:
    "[Cloud] Get version details for footer comment version. Retrieves version details for the specified footer comment version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the footer comment for which version details should be returned.",
      },
      version_number: {
        type: "integer",
        description: "The version number of the footer comment to be returned.",
      },
    },
    required: ["id", "version_number"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/footer-comments/{id}/versions/{version_number}",
  },
});
