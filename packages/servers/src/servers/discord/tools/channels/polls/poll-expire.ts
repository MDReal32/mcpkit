import { defineTool } from "@usemcpkit/core";

export const channelsPollsPollExpire = defineTool({
  name: "channels:polls:poll_expire",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      message_id: {
        type: "string",
      },
    },
    required: ["channel_id", "message_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/polls/{message_id}/expire",
  },
});
