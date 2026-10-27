import { defineTool } from "@usemcpkit/core";

export const guildsPreviewGetGuildPreview = defineTool({
  name: "guilds:preview:get_guild_preview",
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
    path: "/guilds/{guild_id}/preview",
  },
});
