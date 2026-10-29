import { defineTool } from "@usemcpkit/core";

export const guildsVoiceStatesUpdateSelfVoiceState = defineTool({
  name: "guilds:voice_states:update_self_voice_state",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      request_to_speak_timestamp: {
        type: "string",
      },
      suppress: {
        type: "boolean",
      },
      channel_id: {},
    },
    required: ["guild_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/voice-states/@me",
    body: ["request_to_speak_timestamp", "suppress", "channel_id"],
  },
});
