import { defineTool } from "@usemcpkit/core";

export const lobbiesMessagesUpdateLobbyMessageExternalModerationMetadata = defineTool({
  name: "lobbies:messages:update_lobby_message_external_moderation_metadata",
  description: ". Update the external moderation metadata for a lobby message.",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
      body: {
        type: "object",
        description: "The moderation metadata attached to the message",
      },
    },
    required: ["lobby_id", "message_id", "body"],
  },
  request: {
    method: "PUT",
    path: "/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata",
    bodyArg: "body",
  },
});
