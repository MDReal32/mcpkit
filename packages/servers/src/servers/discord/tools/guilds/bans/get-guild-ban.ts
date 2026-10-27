import { defineTool } from "@usemcpkit/core";

export const guildsBansGetGuildBan = defineTool({
  name: "guilds:bans:get_guild_ban",
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
    path: "/guilds/{guild_id}/bans/{user_id}",
  },
});
