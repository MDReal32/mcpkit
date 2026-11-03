import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksPutWebhook = defineTool({
  name: "webhooks:webhooks:put_webhook",
  description: "Update a webhook. Update a webhook by ID.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "ID of webhook to update",
      },
      event_type: {
        type: "string",
        description: "An enum representing the possible events that a webhook can subscribe to",
        enum: [
          "PING",
          "FILE_UPDATE",
          "FILE_VERSION_UPDATE",
          "FILE_DELETE",
          "LIBRARY_PUBLISH",
          "FILE_COMMENT",
          "DEV_MODE_STATUS_UPDATE",
        ],
      },
      endpoint: {
        type: "string",
        description:
          "The HTTP endpoint that will receive a POST request when the event triggers. Max length 2048 characters.",
      },
      passcode: {
        type: "string",
        description:
          "String that will be passed back to your webhook endpoint to verify that it is being called by Figma. Max length 100 characters.",
      },
      status: {
        type: "string",
        description:
          "An enum representing the possible statuses you can set a webhook to: - `ACTIVE`: The webhook is healthy and receive all events - `PAUSED`: The webhook is paused and will not receive any events",
        enum: ["ACTIVE", "PAUSED"],
      },
      description: {
        type: "string",
        description: "User provided description or name for the webhook. Max length 150 characters.",
      },
    },
    required: ["webhook_id", "event_type", "endpoint", "passcode"],
  },
  request: {
    method: "PUT",
    path: "/v2/webhooks/{webhook_id}",
    body: ["event_type", "endpoint", "passcode", "status", "description"],
  },
});
