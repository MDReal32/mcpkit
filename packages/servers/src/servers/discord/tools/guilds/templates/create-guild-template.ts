import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesCreateGuildTemplate = defineTool({
  name: "guilds:templates:create_guild_template",
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
      description: {
        type: "string",
      },
    },
    required: ["guild_id", "name"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/templates",
    body: ["name", "description"],
  },
});
