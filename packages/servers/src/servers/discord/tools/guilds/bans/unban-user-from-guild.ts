import { defineTool } from "@usemcpkit/core";

export const guildsBansUnbanUserFromGuild = defineTool({
  name: "guilds:bans:unban_user_from_guild",
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
      body: {
        type: "object",
      },
    },
    required: ["guild_id", "user_id", "body"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/bans/{user_id}",
    bodyArg: "body",
  },
});
