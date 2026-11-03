import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetWebhookRequests = defineTool({
  name: "webhooks:webhooks:get_webhook_requests",
  description: "Get webhook requests. Returns all webhook requests sent within the last week. Useful for debugging.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "The id of the webhook subscription you want to see events from",
      },
    },
    required: ["webhook_id"],
  },
  request: {
    method: "GET",
    path: "/v2/webhooks/{webhook_id}/requests",
  },
});
