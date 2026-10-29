import { defineTool } from "@usemcpkit/core";

export const usersGuildsLeaveGuild = defineTool({
  name: "users:guilds:leave_guild",
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
    method: "DELETE",
    path: "/users/@me/guilds/{guild_id}",
  },
});
