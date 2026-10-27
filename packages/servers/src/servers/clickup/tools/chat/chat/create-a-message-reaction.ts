import { defineTool } from "@usemcpkit/core";

export const chatChatCreateAMessageReaction = defineTool({
  name: "chat:chat:create_a_message_reaction",
  description: "Create a message reaction. This endpoint creates a message reaction using lower case emoji names.",
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
        description: "The name of the emoji to use for the reaction.",
      },
    },
    required: ["workspace_id", "message_id", "reaction"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}/reactions",
    body: ["reaction"],
  },
});
