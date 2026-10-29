import { defineTool } from "@usemcpkit/core";

export const guildsMembersAddGuildMember = defineTool({
  name: "guilds:members:add_guild_member",
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
        items: {
          type: "string",
        },
      },
      mute: {
        type: "boolean",
      },
      deaf: {
        type: "boolean",
      },
      access_token: {
        type: "string",
      },
      flags: {
        type: "integer",
      },
    },
    required: ["guild_id", "user_id", "access_token"],
  },
  request: {
    method: "PUT",
    path: "/guilds/{guild_id}/members/{user_id}",
    body: ["nick", "roles", "mute", "deaf", "access_token", "flags"],
  },
});
