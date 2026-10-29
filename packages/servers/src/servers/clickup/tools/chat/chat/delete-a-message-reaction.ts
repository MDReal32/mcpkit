import { defineTool } from "@usemcpkit/core";

export const chatChatDeleteAMessageReaction = defineTool({
  name: "chat:chat:delete_a_message_reaction",
  description: "Delete a message reaction. This endpoint deletes a message reaction.",
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
      reaction: {
        type: "string",
        description: "The name of the reaction to be deleted.",
      },
    },
    required: ["workspace_id", "message_id", "reaction"],
  },
  request: {
    method: "DELETE",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}/reactions/{reaction}",
  },
});
