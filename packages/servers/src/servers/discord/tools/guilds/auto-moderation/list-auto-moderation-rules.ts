import { defineTool } from "@usemcpkit/core";

export const guildsAutoModerationListAutoModerationRules = defineTool({
  name: "guilds:auto_moderation:list_auto_moderation_rules",
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
    path: "/guilds/{guild_id}/auto-moderation/rules",
  },
});
