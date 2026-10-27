import { defineTool } from "@usemcpkit/core";

export const guildsRolesUpdateGuildRole = defineTool({
  name: "guilds:roles:update_guild_role",
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
      name: {
        type: "string",
      },
      permissions: {
        type: "integer",
      },
      color: {
        type: "integer",
      },
      colors: {
        type: "object",
        properties: {
          primary_color: {
            type: "integer",
          },
          secondary_color: {
            type: "integer",
          },
          tertiary_color: {
            type: "integer",
          },
        },
      },
      hoist: {
        type: "boolean",
      },
      mentionable: {
        type: "boolean",
      },
      icon: {
        type: "string",
      },
      unicode_emoji: {
        type: "string",
      },
    },
    required: ["guild_id", "role_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/roles/{role_id}",
    body: ["name", "permissions", "color", "colors", "hoist", "mentionable", "icon", "unicode_emoji"],
  },
});
