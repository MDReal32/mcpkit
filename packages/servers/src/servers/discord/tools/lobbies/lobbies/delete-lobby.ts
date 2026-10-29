import { defineTool } from "@usemcpkit/core";

export const lobbiesLobbiesDeleteLobby = defineTool({
  name: "lobbies:lobbies:delete_lobby",
  description: ". Deletes the specified lobby if it exists. It is safe to call even if the lobby is already deleted.",
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
    method: "DELETE",
    path: "/lobbies/{lobby_id}",
  },
});
