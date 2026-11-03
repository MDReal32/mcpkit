import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksPostWebhook = defineTool({
  name: "webhooks:webhooks:post_webhook",
  description:
    "Create a webhook. Create a new webhook which will call the specified endpoint when the event triggers. By default, this webhook will automatically send a PING event to the endpoint when it is created. If this behavior is not desired, you can create the webhook and set the status to PAUSED and reactivate it later.",
  input: {
    type: "object",
    properties: {
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
      team_id: {
        type: "string",
        description: "Team id to receive updates about. This is deprecated, use 'context' and 'context_id' instead.",
      },
      context: {
        type: "string",
        description: 'Context to create the webhook for. Must be "team", "project", or "file".',
      },
      context_id: {
        type: "string",
        description: "The id of the context you want to receive updates about.",
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
    required: ["event_type", "context", "context_id", "endpoint", "passcode"],
  },
  request: {
    method: "POST",
    path: "/v2/webhooks",
    body: ["event_type", "team_id", "context", "context_id", "endpoint", "passcode", "status", "description"],
  },
});
