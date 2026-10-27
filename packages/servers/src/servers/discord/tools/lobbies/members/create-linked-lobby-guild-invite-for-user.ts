import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersCreateLinkedLobbyGuildInviteForUser = defineTool({
  name: "lobbies:members:create_linked_lobby_guild_invite_for_user",
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
    method: "POST",
    path: "/lobbies/{lobby_id}/members/{user_id}/invites",
  },
});
