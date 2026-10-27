import { defineTool } from "@usemcpkit/core";

export const guildsRolesCreateGuildRole = defineTool({
  name: "guilds:roles:create_guild_role",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
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
    required: ["guild_id"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/roles",
    body: ["name", "permissions", "color", "colors", "hoist", "mentionable", "icon", "unicode_emoji"],
  },
});
