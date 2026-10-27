import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersDeleteLobbyMember = defineTool({
  name: "lobbies:members:delete_lobby_member",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["lobby_id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/lobbies/{lobby_id}/members/{user_id}",
  },
});
