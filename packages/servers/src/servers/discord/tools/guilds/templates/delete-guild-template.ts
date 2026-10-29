import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesDeleteGuildTemplate = defineTool({
  name: "guilds:templates:delete_guild_template",
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
    method: "DELETE",
    path: "/guilds/{guild_id}/templates/{code}",
  },
});
