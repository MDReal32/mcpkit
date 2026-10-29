import { defineTool } from "@usemcpkit/core";

export const tasksAttachmentsCreateTaskAttachment = defineTool({
  name: "tasks:attachments:create_task_attachment",
  description:
    "Create Task Attachment. Upload a file to a task as an attachment. Files stored in the cloud cannot be used in this API request.\\ \\ ***Note:** This request uses multipart/form-data as the content type.* \\ ***Tip:** Try our new V3 Attachments API, which supports both tasks and File type Custom Fields!*",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by its custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
      attachment: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "POST",
    path: "/v2/task/{task_id}/attachment",
    query: ["custom_task_ids", "team_id"],
    body: ["attachment"],
    contentType: "multipart/form-data",
    fileArgs: ["attachment"],
  },
});
