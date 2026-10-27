import { defineTool } from "@usemcpkit/core";

export const tasksCommentsGetThreadedComments = defineTool({
  name: "tasks:comments:get_threaded_comments",
  description: "Get Threaded Comments. View threaded comments. The parent comment is not included in the response.",
  input: {
    type: "object",
    properties: {
      comment_id: {
        type: "number",
      },
    },
    required: ["comment_id"],
  },
  request: {
    method: "GET",
    path: "/v2/comment/{comment_id}/reply",
  },
});
