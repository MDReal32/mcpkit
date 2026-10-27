import { defineTool } from "@usemcpkit/core";

export const tasksAttachmentsGetAttachments = defineTool({
  name: "tasks:attachments:get_attachments",
  description:
    "Get Attachments. Return a list of attachments for the specified entity, including a task or File type Custom Field.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      entity_type: {
        type: "string",
        enum: ["attachments", "custom_fields"],
        description:
          "The entity type. Options include `attachments` for tasks and `custom_fields` for a File type Custom Field.",
      },
      entity_id: {
        type: "string",
        description: "The ID of the task or Custom Field.",
      },
      cursor: {
        type: "string",
        description: "The cursor to use to fetch the next page of results.",
      },
      limit: {
        type: "integer",
        default: 50,
        description: "The maximum number of results to fetch for this page.",
      },
    },
    required: ["workspace_id", "entity_type", "entity_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/{entity_type}/{entity_id}/attachments",
    query: ["cursor", "limit"],
  },
});
