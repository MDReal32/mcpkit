import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesListGuildTemplates = defineTool({
  name: "guilds:templates:list_guild_templates",
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
    path: "/guilds/{guild_id}/templates",
  },
});
