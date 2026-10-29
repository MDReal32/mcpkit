import { defineTool } from "@usemcpkit/core";

export const guildsMembersGetGuildMember = defineTool({
  name: "guilds:members:get_guild_member",
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
    method: "GET",
    path: "/guilds/{guild_id}/members/{user_id}",
  },
});
