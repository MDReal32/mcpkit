import { defineTool } from "@usemcpkit/core";

export const chatChatDeleteAChannel = defineTool({
  name: "chat:chat:delete_a_channel",
  description:
    "Delete a Channel. This endpoint deletes a Channel. Applies to Channels tied to a Space, Folder, or List or not tied to locations.",
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
    },
    required: ["workspace_id", "channel_id"],
  },
  request: {
    method: "DELETE",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}",
  },
});
