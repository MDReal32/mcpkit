import { defineTool } from "@usemcpkit/core";

export const chatChatDeleteAMessage = defineTool({
  name: "chat:chat:delete_a_message",
  description: "Delete a message. This endpoint deletes a message.",
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
    },
    required: ["workspace_id", "message_id"],
  },
  request: {
    method: "DELETE",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}",
  },
});
