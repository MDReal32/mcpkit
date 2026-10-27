import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsListGuildApplicationCommandPermissions = defineTool({
  name: "applications:commands:list_guild_application_command_permissions",
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
    },
    required: ["application_id", "guild_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/guilds/{guild_id}/commands/permissions",
  },
});
