import { defineTool } from "@usemcpkit/core";

export const guildsMembersDeleteGuildMemberRole = defineTool({
  name: "guilds:members:delete_guild_member_role",
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
      role_id: {
        type: "string",
      },
    },
    required: ["guild_id", "user_id", "role_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
  },
});
