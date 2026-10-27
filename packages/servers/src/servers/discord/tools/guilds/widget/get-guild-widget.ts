import { defineTool } from "@usemcpkit/core";

export const guildsWidgetGetGuildWidget = defineTool({
  name: "guilds:widget:get_guild_widget",
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
    path: "/guilds/{guild_id}/widget.json",
  },
});
