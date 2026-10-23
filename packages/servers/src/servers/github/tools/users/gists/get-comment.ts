import { defineTool } from "@usemcpkit/core";

export const usersGistsGetComment = defineTool({
  name: "users:gists:get_comment",
  description: "Get a gist comment. Gets a comment on a gist.",
  input: {
    type: "object",
    properties: {
      gist_id: {
        type: "string",
        description: "The unique identifier of the gist.",
      },
      comment_id: {
        type: "integer",
        description: "The unique identifier of the comment.",
      },
    },
    required: ["gist_id", "comment_id"],
  },
  request: {
    method: "GET",
    path: "/gists/{gist_id}/comments/{comment_id}",
  },
});
