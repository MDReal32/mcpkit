import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersCreateLinkedLobbyGuildInviteForSelf = defineTool({
  name: "lobbies:members:create_linked_lobby_guild_invite_for_self",
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
    method: "POST",
    path: "/lobbies/{lobby_id}/members/@me/invites",
  },
});
