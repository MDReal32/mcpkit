import { defineTool } from "@usemcpkit/core";

export const guildsIntegrationsListGuildIntegrations = defineTool({
  name: "guilds:integrations:list_guild_integrations",
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
    path: "/guilds/{guild_id}/integrations",
  },
});
