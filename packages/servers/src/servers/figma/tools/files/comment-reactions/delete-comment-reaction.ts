import { defineTool } from "@usemcpkit/core";

export const filesCommentReactionsDeleteCommentReaction = defineTool({
  name: "files:comment_reactions:delete_comment_reaction",
  description:
    "Delete a reaction. Deletes a specific comment reaction. Only the person who made the reaction is allowed to delete it.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to delete comment reaction from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      comment_id: {
        type: "string",
        description: "ID of comment to delete reaction from.",
      },
      emoji: {
        type: "string",
        description:
          "The emoji type of reaction as shortcode (e.g. `:heart:`, `:+1::skin-tone-2:`). The list of accepted emoji shortcodes can be found in this file under the top-level emojis and aliases fields, with optional skin tone modifiers when applicable.",
      },
    },
    required: ["file_key", "comment_id", "emoji"],
  },
  request: {
    method: "DELETE",
    path: "/v1/files/{file_key}/comments/{comment_id}/reactions",
    query: ["emoji"],
  },
});
