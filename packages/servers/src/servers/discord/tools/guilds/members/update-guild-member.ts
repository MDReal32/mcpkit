import { defineTool } from "@usemcpkit/core";

export const guildsMembersUpdateGuildMember = defineTool({
  name: "guilds:members:update_guild_member",
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
      nick: {
        type: "string",
      },
      roles: {
        type: "array",
        items: {},
      },
      mute: {
        type: "boolean",
      },
      deaf: {
        type: "boolean",
      },
      channel_id: {},
      communication_disabled_until: {
        type: "string",
      },
      flags: {
        type: "integer",
      },
    },
    required: ["guild_id", "user_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/members/{user_id}",
    body: ["nick", "roles", "mute", "deaf", "channel_id", "communication_disabled_until", "flags"],
  },
});
