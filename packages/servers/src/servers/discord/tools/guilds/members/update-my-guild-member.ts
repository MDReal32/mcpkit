import { defineTool } from "@usemcpkit/core";

export const guildsMembersUpdateMyGuildMember = defineTool({
  name: "guilds:members:update_my_guild_member",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      nick: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
      bio: {
        type: "string",
      },
      banner: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/members/@me",
    body: ["nick", "avatar", "bio", "banner"],
  },
});
