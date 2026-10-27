import { defineTool } from "@usemcpkit/core";

export const tasksCommentsGetListComments = defineTool({
  name: "tasks:comments:get_list_comments",
  description:
    "Get List Comments. View the comments added to a List. \\ \\ If you do not include the `start` and `start_id` parameters, this endpoint will return the most recent 25 comments.\\ \\ Use the `start` and `start id` parameters of the oldest comment to retrieve the next 25 comments.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      start: {
        type: "integer",
        description: "Enter the `date` of a List info comment using Unix time in milliseconds.",
      },
      start_id: {
        type: "string",
        description: "Enter the Comment `id` of a List info comment.",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}/comment",
    query: ["start", "start_id"],
  },
});
