import { defineTool } from "@usemcpkit/core";

export const guildsWidgetGetGuildWidgetSettings = defineTool({
  name: "guilds:widget:get_guild_widget_settings",
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
    path: "/guilds/{guild_id}/widget",
  },
});
