import { defineTool } from "@usemcpkit/core";

export const hierarchyListsCreateFolderlessList = defineTool({
  name: "hierarchy:lists:create_folderless_list",
  description: "Create Folderless List. Add a new List in a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
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
        description: "Include a `user_id` to add a List owner.",
      },
      status: {
        type: "string",
        description: "**Status** refers to the List color rather than the task Statuses available in the List.",
      },
    },
    required: ["space_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v2/space/{space_id}/list",
    body: ["name", "content", "markdown_content", "due_date", "due_date_time", "priority", "assignee", "status"],
  },
});
