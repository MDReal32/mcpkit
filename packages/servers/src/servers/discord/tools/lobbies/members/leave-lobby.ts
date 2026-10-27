import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersLeaveLobby = defineTool({
  name: "lobbies:members:leave_lobby",
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
    method: "DELETE",
    path: "/lobbies/{lobby_id}/members/@me",
  },
});
