import { defineTool } from "@usemcpkit/core";

export const guildsMembersSearchGuildMembers = defineTool({
  name: "guilds:members:search_guild_members",
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
      query: {
        type: "string",
      },
    },
    required: ["guild_id", "query"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/members/search",
    query: ["limit", "query"],
  },
});
