import { defineTool } from "@usemcpkit/core";

export const tasksCommentsGetChatViewComments = defineTool({
  name: "tasks:comments:get_chat_view_comments",
  description:
    "Get Chat View Comments. View comments from a Chat view. \\ \\ If you do not include the `start` and `start_id` parameters, this endpoint will return the most recent 25 comments.\\ \\ Use the `start` and `start id` parameters of the oldest comment to retrieve the next 25 comments.",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
        description: "105 (string)",
      },
      start: {
        type: "integer",
        description: "Enter the `date` of a Chat view comment using Unix time in milliseconds.",
      },
      start_id: {
        type: "string",
        description: "Enter the Comment `id` of a Chat view comment.",
      },
    },
    required: ["view_id"],
  },
  request: {
    method: "GET",
    path: "/v2/view/{view_id}/comment",
    query: ["start", "start_id"],
  },
});
