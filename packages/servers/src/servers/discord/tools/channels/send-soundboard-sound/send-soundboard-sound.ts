import { defineTool } from "@usemcpkit/core";

export const channelsSendSoundboardSoundSendSoundboardSound = defineTool({
  name: "channels:send_soundboard_sound:send_soundboard_sound",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      sound_id: {
        type: "string",
      },
      source_guild_id: {},
    },
    required: ["channel_id", "sound_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/send-soundboard-sound",
    body: ["sound_id", "source_guild_id"],
  },
});
