import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsDeleteGuildApplicationCommand = defineTool({
  name: "applications:commands:delete_guild_application_command",
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
    },
    required: ["application_id", "guild_id", "command_id"],
  },
  request: {
    method: "DELETE",
    path: "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
  },
});
