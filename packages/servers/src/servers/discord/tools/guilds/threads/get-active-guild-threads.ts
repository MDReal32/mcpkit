import { defineTool } from "@usemcpkit/core";

export const guildsThreadsGetActiveGuildThreads = defineTool({
  name: "guilds:threads:get_active_guild_threads",
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
    path: "/guilds/{guild_id}/threads/active",
  },
});
