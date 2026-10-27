import { defineTool } from "@usemcpkit/core";

export const channelsFollowersFollowChannel = defineTool({
  name: "channels:followers:follow_channel",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      webhook_channel_id: {
        type: "string",
      },
    },
    required: ["channel_id", "webhook_channel_id"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/followers",
    body: ["webhook_channel_id"],
  },
});
