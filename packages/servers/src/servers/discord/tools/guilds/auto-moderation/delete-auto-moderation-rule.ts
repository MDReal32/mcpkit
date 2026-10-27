import { defineTool } from "@usemcpkit/core";

export const guildsAutoModerationDeleteAutoModerationRule = defineTool({
  name: "guilds:auto_moderation:delete_auto_moderation_rule",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      rule_id: {
        type: "string",
      },
    },
    required: ["guild_id", "rule_id"],
  },
  request: {
    method: "DELETE",
    path: "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
  },
});
