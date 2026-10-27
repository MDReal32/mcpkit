import { defineTool } from "@usemcpkit/core";

export const guildsPrunePreviewPruneGuild = defineTool({
  name: "guilds:prune:preview_prune_guild",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      days: {
        type: "integer",
      },
      include_roles: {},
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/prune",
    query: ["days", "include_roles"],
  },
});
