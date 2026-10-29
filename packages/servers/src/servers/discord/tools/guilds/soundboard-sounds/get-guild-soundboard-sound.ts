import { defineTool } from "@usemcpkit/core";

export const guildsSoundboardSoundsGetGuildSoundboardSound = defineTool({
  name: "guilds:soundboard_sounds:get_guild_soundboard_sound",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      sound_id: {
        type: "string",
      },
    },
    required: ["guild_id", "sound_id"],
  },
  request: {
    method: "GET",
    path: "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
  },
});
