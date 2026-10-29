import { defineTool } from "@usemcpkit/core";

export const guildsTemplatesGetGuildTemplate = defineTool({
  name: "guilds:templates:get_guild_template",
  description: "",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
    },
    required: ["code"],
  },
  request: {
    method: "GET",
    path: "/guilds/templates/{code}",
  },
});
