import { defineTool } from "@usemcpkit/core";

export const lobbiesLobbiesGetLobby = defineTool({
  name: "lobbies:lobbies:get_lobby",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
    },
    required: ["lobby_id"],
  },
  request: {
    method: "GET",
    path: "/lobbies/{lobby_id}",
  },
});
