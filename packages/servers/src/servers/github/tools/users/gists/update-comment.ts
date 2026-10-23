import { defineTool } from "@usemcpkit/core";

export const usersGistsUpdateComment = defineTool({
  name: "users:gists:update_comment",
  description: "Update a gist comment. Updates a comment on a gist.",
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
      body: {
        type: "string",
        description: "The comment text.",
      },
    },
    required: ["gist_id", "comment_id", "body"],
  },
  request: {
    method: "PATCH",
    path: "/gists/{gist_id}/comments/{comment_id}",
    body: ["body"],
  },
});
