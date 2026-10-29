import { defineTool } from "@usemcpkit/core";

export const chatChatCreateAChannel = defineTool({
  name: "chat:chat:create_a_channel",
  description:
    "Create a Channel. This endpoint creates a new Channel not tied to a Space, Folder, or List. If a Channel with the specified name already exists it returns it.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      description: {
        type: "string",
        description: "The description for the Chat being created.",
      },
      name: {
        type: "string",
        description: "The name for the Chat being created.",
      },
      topic: {
        type: "string",
        description: "The topic of the Chat being created.",
      },
      user_ids: {
        type: "array",
        description: "Optionally specify unique user IDs, up to 100.",
        items: {
          type: "string",
        },
      },
      visibility: {
        type: "string",
        description: "The visibility of the Chat being created. If not specified, the Chat is PUBLIC.",
        enum: ["PUBLIC", "PRIVATE"],
      },
    },
    required: ["workspace_id", "name"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/chat/channels",
    body: ["description", "name", "topic", "user_ids", "visibility"],
  },
});
