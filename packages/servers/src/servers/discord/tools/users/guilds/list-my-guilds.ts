import { defineTool } from "@usemcpkit/core";

export const usersGuildsListMyGuilds = defineTool({
  name: "users:guilds:list_my_guilds",
  description: "",
  input: {
    type: "object",
    properties: {
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      shard: {
        type: "integer",
      },
      with_counts: {
        type: "boolean",
      },
    },
  },
  request: {
    method: "GET",
    path: "/users/@me/guilds",
    query: ["before", "after", "limit", "shard", "with_counts"],
  },
});
