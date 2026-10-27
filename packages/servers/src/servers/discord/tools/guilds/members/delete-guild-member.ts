import { defineTool } from "@usemcpkit/core";

export const guildsMembersDeleteGuildMember = defineTool({
  name: "guilds:members:delete_guild_member",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["guild_id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/members/{user_id}",
  },
});
