import { defineTool } from "@usemcpkit/core";

export const guildsIntegrationsDeleteGuildIntegration = defineTool({
  name: "guilds:integrations:delete_guild_integration",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      integration_id: {
        type: "string",
      },
    },
    required: ["guild_id", "integration_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/integrations/{integration_id}",
  },
});
