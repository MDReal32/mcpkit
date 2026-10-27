import { defineTool } from "@usemcpkit/core";

export const hierarchyListsCreateList = defineTool({
  name: "hierarchy:lists:create_list",
  description: "Create List. Add a new List to a Folder.",
  input: {
    type: "object",
    properties: {
      folder_id: {
        type: "number",
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
        type: "integer",
        description: "Include a `user_id` to assign this List.",
      },
      status: {
        type: "string",
        description: "**Status** refers to the List color rather than the task Statuses available in the List.",
      },
    },
    required: ["folder_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/folder/{folder_id}/list",
    body: ["name", "content", "markdown_content", "due_date", "due_date_time", "priority", "assignee", "status"],
  },
});
