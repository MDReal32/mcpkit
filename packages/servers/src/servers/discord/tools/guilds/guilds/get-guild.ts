import { defineTool } from "@usemcpkit/core";

export const guildsGuildsGetGuild = defineTool({
  name: "guilds:guilds:get_guild",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      with_counts: {
        type: "boolean",
      },
    },
    required: ["guild_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}",
    query: ["with_counts"],
  },
});
