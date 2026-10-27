import { defineTool } from "@usemcpkit/core";

export const chatChatUpdateAChannel = defineTool({
  name: "chat:chat:update_a_channel",
  description: "Update a Channel. This endpoint updates a single Channel.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      channel_id: {
        type: "string",
        description: "The ID of the specified Channel.",
      },
      content_format: {
        type: "string",
        description: "The format of content field values (Default: text/md)",
        default: "text/md",
        enum: ["text/md", "text/plain"],
      },
      description: {
        type: "string",
        description: "The updated description of the Chat.",
      },
      location: {
        type: "object",
        description: "The updated location of the chat: space, folder, or list",
        properties: {
          id: {
            type: "string",
            description: "The ID of the hierarchy entity where the chat is to be located",
          },
          type: {
            type: "string",
            description: "The type of the location. Must be a space, folder, or list.",
            enum: ["folder", "list", "space"],
          },
        },
        required: ["id", "type"],
      },
      name: {
        type: "string",
        description: "The updated name of the Chat.",
      },
      topic: {
        type: "string",
        description: "The updated topic of the Chat.",
      },
      visibility: {
        type: "string",
        description: "The updated visibility of the Chat.",
        enum: ["PUBLIC", "PRIVATE"],
      },
    },
    required: ["workspace_id", "channel_id"],
  },
  request: {
    method: "PATCH",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}",
    body: ["content_format", "description", "location", "name", "topic", "visibility"],
  },
});
