import { defineTool } from "@usemcpkit/core";

export const guildsChannelsListGuildChannels = defineTool({
  name: "guilds:channels:list_guild_channels",
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
    path: "/guilds/{guild_id}/channels",
  },
});
