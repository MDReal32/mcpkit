import { defineTool } from "@usemcpkit/core";

export const channelsVoiceStatusUpdateVoiceChannelStatus = defineTool({
  name: "channels:voice_status:update_voice_channel_status",
  description: ". Set a voice channel's status.",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      status: {
        type: "string",
        description: "The new voice channel status",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "PUT",
    path: "/channels/{channel_id}/voice-status",
    body: ["status"],
  },
});
