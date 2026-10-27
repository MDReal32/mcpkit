import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksUpdateWebhook = defineTool({
  name: "webhooks:webhooks:update_webhook",
  description: "",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
      channel_id: {},
    },
    required: ["webhook_id"],
  },
  request: {
    method: "PATCH",
    path: "/webhooks/{webhook_id}",
    body: ["name", "avatar", "channel_id"],
  },
});
