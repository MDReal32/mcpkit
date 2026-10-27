import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsSetGuildApplicationCommandPermissions = defineTool({
  name: "applications:commands:set_guild_application_command_permissions",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      guild_id: {
        type: "string",
      },
      command_id: {
        type: "string",
      },
      permissions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            type: {
              type: "integer",
            },
            permission: {
              type: "boolean",
            },
          },
          required: ["id", "type", "permission"],
        },
      },
    },
    required: ["application_id", "guild_id", "command_id"],
  },
  request: {
    method: "PUT",
    path: "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions",
    body: ["permissions"],
  },
});
