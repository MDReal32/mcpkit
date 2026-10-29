import { defineTool } from "@usemcpkit/core";

export const chatChatUpdateAMessage = defineTool({
  name: "chat:chat:update_a_message",
  description: "Update a message. This endpoint updates a message.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      message_id: {
        type: "string",
        description: "The ID of the specified message.",
      },
      assignee: {
        type: "string",
        description: "The possible assignee of the message.",
      },
      group_assignee: {
        type: "string",
        description: "The possible group assignee of the message.",
      },
      content: {
        type: "string",
        description: "The full content of the message to be created",
      },
      content_format: {
        type: "string",
        description: "The format of the Chat Message content (Default: text/md)",
        default: "text/md",
        enum: ["text/md", "text/plain"],
      },
      post_data: {
        type: "object",
        description: "The data of the post message.",
        properties: {
          subtype: {
            type: "object",
            description: "The subtype of the chat post.",
            properties: {
              id: {
                type: "string",
                description: "The subtype ID of the chat post.",
              },
            },
            required: ["id"],
          },
          title: {
            type: "string",
            description: "The title of the chat post.",
          },
        },
      },
      resolved: {
        type: "boolean",
        description: "The resolved status of the message.",
      },
    },
    required: ["workspace_id", "message_id"],
  },
  request: {
    method: "PATCH",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}",
    body: ["assignee", "group_assignee", "content", "content_format", "post_data", "resolved"],
  },
});
