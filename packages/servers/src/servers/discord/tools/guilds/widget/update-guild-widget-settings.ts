import { defineTool } from "@usemcpkit/core";

export const guildsWidgetUpdateGuildWidgetSettings = defineTool({
  name: "guilds:widget:update_guild_widget_settings",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      channel_id: {},
      enabled: {
        type: "boolean",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/widget",
    body: ["channel_id", "enabled"],
  },
});
