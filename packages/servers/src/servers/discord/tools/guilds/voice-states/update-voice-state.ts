import { defineTool } from "@usemcpkit/core";

export const guildsVoiceStatesUpdateVoiceState = defineTool({
  name: "guilds:voice_states:update_voice_state",
  description: "",
  input: {
    type: "object",
    properties: {
      guild_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
      suppress: {
        type: "boolean",
      },
      channel_id: {},
    },
    required: ["guild_id", "user_id"],
  },
  request: {
    method: "PATCH",
    path: "/guilds/{guild_id}/voice-states/{user_id}",
    body: ["suppress", "channel_id"],
  },
});
