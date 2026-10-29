import { defineTool } from "@usemcpkit/core";

export const guildsBansBanUserFromGuild = defineTool({
  name: "guilds:bans:ban_user_from_guild",
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
      delete_message_seconds: {
        type: "integer",
      },
      delete_message_days: {
        type: "integer",
      },
    },
    required: ["guild_id", "user_id"],
  },
  request: {
    method: "PUT",
    path: "/guilds/{guild_id}/bans/{user_id}",
    body: ["delete_message_seconds", "delete_message_days"],
  },
});
