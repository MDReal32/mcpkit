import { defineTool } from "@usemcpkit/core";

export const guildsInvitesListGuildInvites = defineTool({
  name: "guilds:invites:list_guild_invites",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/invites",
  },
});
