import { defineTool } from "@usemcpkit/core";

export const guildsBulkBanBulkBanUsersFromGuild = defineTool({
  name: "guilds:bulk_ban:bulk_ban_users_from_guild",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      user_ids: {
        type: "array",
        items: {
          type: "string",
        },
      },
      delete_message_seconds: {
        type: "integer",
      },
    },
    required: ["guild_id", "user_ids"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/bulk-ban",
    body: ["user_ids", "delete_message_seconds"],
  },
});
