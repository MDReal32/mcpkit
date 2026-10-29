import { defineTool } from "@usemcpkit/core";

export const guildsWebhooksGetGuildWebhooks = defineTool({
  name: "guilds:webhooks:get_guild_webhooks",
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
    path: "/guilds/{guild_id}/webhooks",
  },
});
