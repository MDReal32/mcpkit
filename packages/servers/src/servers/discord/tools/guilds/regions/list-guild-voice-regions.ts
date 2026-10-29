import { defineTool } from "@usemcpkit/core";

export const guildsRegionsListGuildVoiceRegions = defineTool({
  name: "guilds:regions:list_guild_voice_regions",
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
    path: "/guilds/{guild_id}/regions",
  },
});
