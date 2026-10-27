import { defineTool } from "@usemcpkit/core";

export const guildsWidgetGetGuildWidgetPng = defineTool({
  name: "guilds:widget:get_guild_widget_png",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      style: {
        type: "string",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["guild_id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/widget.png",
    query: ["style"],
    saveToArg: "save_to",
  },
});
