import { defineTool } from "@usemcpkit/core";

export const guildsSoundboardSoundsCreateGuildSoundboardSound = defineTool({
  name: "guilds:soundboard_sounds:create_guild_soundboard_sound",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
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
      sound: {
        type: "string",
      },
    },
    required: ["guild_id", "name", "sound"],
  },
  request: {
    method: "POST",
    path: "/guilds/{guild_id}/soundboard-sounds",
    body: ["name", "volume", "emoji_id", "emoji_name", "sound"],
  },
});
