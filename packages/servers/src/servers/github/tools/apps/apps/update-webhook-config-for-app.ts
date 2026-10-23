import { defineTool } from "@usemcpkit/core";

export const appsAppsUpdateWebhookConfigForApp = defineTool({
  name: "apps:apps:update_webhook_config_for_app",
  description:
    'Update a webhook configuration for an app. Updates the webhook configuration for a GitHub App. For more information about configuring a webhook for your app, see "Creating a GitHub App."',
  input: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The URL to which the payloads will be delivered.",
      },
      content_type: {
        type: "string",
        description:
          "The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.",
      },
      secret: {
        type: "string",
        description:
          "If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for delivery signature headers.",
      },
      insecure_ssl: {},
    },
  },
  request: {
    method: "PATCH",
    path: "/app/hook/config",
    body: ["url", "content_type", "secret", "insecure_ssl"],
  },
});
