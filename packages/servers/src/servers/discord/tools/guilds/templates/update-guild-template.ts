import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesUpdateGuildTemplate = defineTool({
  name: "guilds:templates:update_guild_template",
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
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["guild_id", "code"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/templates/{code}",
    body: ["name", "description"],
  },
});
