import { defineTool } from "@usemcpkit/core";

export const hierarchyListsUpdateList = defineTool({
  name: "hierarchy:lists:update_list",
  description:
    "Update List. Rename a List, update the List Info description, set a due date/time, set the List's priority, set an assignee, set or remove the List color.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      content: {
        type: "string",
      },
      markdown_content: {
        type: "string",
        description: "Use `markdown_content` instead of `content` to format your List description.",
      },
      due_date: {
        type: "integer",
      },
      due_date_time: {
        type: "boolean",
      },
      priority: {
        type: "integer",
      },
      assignee: {
        type: "string",
      },
      status: {
        type: "string",
        description: "**Status** refers to the List color rather than the task Statuses available in the List.",
      },
      unset_status: {
        type: "boolean",
        description: "By default, this is `false.` To remove the List color use `unset_status: true`.",
      },
    },
    required: ["list_id", "name"],
  },
  request: {
    method: "PUT",
    path: "/v2/list/{list_id}",
    body: [
      "name",
      "content",
      "markdown_content",
      "due_date",
      "due_date_time",
      "priority",
      "assignee",
      "status",
      "unset_status",
    ],
  },
});
