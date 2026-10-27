import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesSyncGuildTemplate = defineTool({
  name: "guilds:templates:sync_guild_template",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      code: {
        type: "string",
      },
    },
    required: ["guild_id", "code"],
  },
  request: {
    method: "PUT",
    path: "/guilds/{guild_id}/templates/{code}",
  },
});
