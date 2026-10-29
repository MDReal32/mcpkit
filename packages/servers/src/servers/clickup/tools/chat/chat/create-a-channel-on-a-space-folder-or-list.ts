import { defineTool } from "@usemcpkit/core";

export const chatChatCreateAChannelOnASpaceFolderOrList = defineTool({
  name: "chat:chat:create_a_channel_on_a_space_folder_or_list",
  description:
    "Create a Channel on a Space, Folder, or List. This endpoint creates a Channel on a Space, Folder, or List. When a Channel already exists on the requested location, it returns it.",
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
      location: {
        type: "object",
        description: "The location of the chat: space, folder, or list",
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
    },
    required: ["workspace_id", "location"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/chat/channels/location",
    body: ["description", "topic", "user_ids", "visibility", "location"],
  },
});
