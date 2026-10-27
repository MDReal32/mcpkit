import { defineTool } from "@usemcpkit/core";

export const guildsSoundboardSoundsUpdateGuildSoundboardSound = defineTool({
  name: "guilds:soundboard_sounds:update_guild_soundboard_sound",
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
      name: {
        type: "string",
      },
      volume: {
        type: "number",
      },
      emoji_id: {},
      emoji_name: {
        type: "string",
      },
    },
    required: ["guild_id", "sound_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/soundboard-sounds/{sound_id}",
    body: ["name", "volume", "emoji_id", "emoji_name"],
  },
});
