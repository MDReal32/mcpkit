import { defineTool } from "@usemcpkit/core";

export const guildsRolesListGuildRoles = defineTool({
  name: "guilds:roles:list_guild_roles",
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
    method: "GET",
    path: "/guilds/{guild_id}/roles",
  },
});
