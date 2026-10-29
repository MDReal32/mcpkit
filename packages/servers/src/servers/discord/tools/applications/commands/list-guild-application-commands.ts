import { defineTool } from "@usemcpkit/core";

export const applicationsCommandsListGuildApplicationCommands = defineTool({
  name: "applications:commands:list_guild_application_commands",
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
      with_localizations: {
        type: "boolean",
      },
    },
    required: ["application_id", "guild_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/guilds/{guild_id}/commands",
    query: ["with_localizations"],
  },
});
