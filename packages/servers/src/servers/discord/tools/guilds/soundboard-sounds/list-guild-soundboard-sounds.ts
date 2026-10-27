import { defineTool } from "@usemcpkit/core";

export const guildsSoundboardSoundsListGuildSoundboardSounds = defineTool({
  name: "guilds:soundboard_sounds:list_guild_soundboard_sounds",
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
    path: "/guilds/{guild_id}/soundboard-sounds",
  },
});
