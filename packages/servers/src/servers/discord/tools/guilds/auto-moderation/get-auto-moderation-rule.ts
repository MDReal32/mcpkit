import { defineTool } from "@usemcpkit/core";

export const guildsAutoModerationGetAutoModerationRule = defineTool({
  name: "guilds:auto_moderation:get_auto_moderation_rule",
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
    method: "GET",
    path: "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
  },
});
