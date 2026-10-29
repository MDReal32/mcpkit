import { defineTool } from "@usemcpkit/core";

export const lobbiesMessagesGetLobbyMessages = defineTool({
  name: "lobbies:messages:get_lobby_messages",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
    },
    required: ["lobby_id"],
  },
  request: {
    method: "GET",
    path: "/lobbies/{lobby_id}/messages",
    query: ["limit"],
  },
});
