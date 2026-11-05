import { defineTool } from "@usemcpkit/core";

export const filesCommentReactionsGetCommentReactions = defineTool({
  name: "files:comment_reactions:get_comment_reactions",
  description: "Get reactions for a comment. Gets a paginated list of reactions left on the comment.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to get comment containing reactions from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      comment_id: {
        type: "string",
        description: "ID of comment to get reactions from.",
      },
      cursor: {
        type: "string",
        description: "Cursor for pagination, retrieved from the response of the previous call.",
      },
    },
    required: ["file_key", "comment_id"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/comments/{comment_id}/reactions",
    query: ["cursor"],
  },
});
