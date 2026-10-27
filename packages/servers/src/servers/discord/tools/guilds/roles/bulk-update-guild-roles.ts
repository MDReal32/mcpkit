import { defineTool } from "@usemcpkit/core";

export const guildsRolesBulkUpdateGuildRoles = defineTool({
  name: "guilds:roles:bulk_update_guild_roles",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {},
            position: {
              type: "integer",
            },
          },
        },
      },
    },
    required: ["guild_id", "body"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/roles",
    bodyArg: "body",
  },
});
