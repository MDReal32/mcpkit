import { defineTool } from "@usemcpkit/core";

export const guildsMembersListGuildMembers = defineTool({
  name: "guilds:members:list_guild_members",
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
      after: {
        type: "string",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/members",
    query: ["limit", "after"],
  },
});
