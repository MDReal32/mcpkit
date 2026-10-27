import { defineTool } from "@usemcpkit/core";

export const channelsWebhooksCreateWebhook = defineTool({
  name: "channels:webhooks:create_webhook",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
    },
    required: ["channel_id", "name"],
  },
  request: {
    method: "POST",
    path: "/channels/{channel_id}/webhooks",
    body: ["name", "avatar"],
  },
});
