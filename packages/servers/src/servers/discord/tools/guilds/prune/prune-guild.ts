import { defineTool } from "@usemcpkit/core";

export const guildsPrunePruneGuild = defineTool({
  name: "guilds:prune:prune_guild",
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
      compute_prune_count: {
        type: "boolean",
      },
      include_roles: {},
    },
    required: ["guild_id"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/prune",
    body: ["days", "compute_prune_count", "include_roles"],
  },
});
