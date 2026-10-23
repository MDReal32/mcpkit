import { defineTool } from "@usemcpkit/core";

export const issuesToDosCreateTodosMarkAsDonePost = defineTool({
  name: "issues:to_dos:create_todos_mark_as_done_post",
  description:
    "Mark all to-do items as done. Marks all pending to-do items for the current user as done. It returns the HTTP status code `204` with an empty response.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/todos/mark_as_done",
  },
});
