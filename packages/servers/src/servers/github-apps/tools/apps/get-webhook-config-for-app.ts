import { defineTool } from '@usemcpkit/core';

export const appsGetWebhookConfigForApp = defineTool({
  name: 'apps:get_webhook_config_for_app',
  description:
    'Get a webhook configuration for an app. Returns the webhook configuration for a GitHub App. For more information about configuring a webhook for your app, see "Creating a GitHub App."',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/app/hook/config',
  },
});
