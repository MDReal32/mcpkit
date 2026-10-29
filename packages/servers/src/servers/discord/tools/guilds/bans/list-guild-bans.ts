import { defineTool } from "@usemcpkit/core";

export const guildsBansListGuildBans = defineTool({
  name: "guilds:bans:list_guild_bans",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/bans",
    query: ["limit", "before", "after"],
  },
});
