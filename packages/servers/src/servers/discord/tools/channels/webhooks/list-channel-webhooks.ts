import { defineTool } from "@usemcpkit/core";

export const channelsWebhooksListChannelWebhooks = defineTool({
  name: "channels:webhooks:list_channel_webhooks",
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
    method: "GET",
    path: "/channels/{channel_id}/webhooks",
  },
});
