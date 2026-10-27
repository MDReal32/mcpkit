import { defineTool } from "@usemcpkit/core";

export const guildsSoundboardSoundsDeleteGuildSoundboardSound = defineTool({
  name: "guilds:soundboard_sounds:delete_guild_soundboard_sound",
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
    method: "DELETE",
    path: "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
  },
});
