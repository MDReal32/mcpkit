import { defineTool } from "@usemcpkit/core";

export const channelsTypingTriggerTypingIndicator = defineTool({
  name: "channels:typing:trigger_typing_indicator",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/typing",
  },
});
