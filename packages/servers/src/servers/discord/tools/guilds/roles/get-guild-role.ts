import { defineTool } from "@usemcpkit/core";

export const guildsRolesGetGuildRole = defineTool({
  name: "guilds:roles:get_guild_role",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      role_id: {
        type: "string",
      },
    },
    required: ["guild_id", "role_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/roles/{role_id}",
  },
});
