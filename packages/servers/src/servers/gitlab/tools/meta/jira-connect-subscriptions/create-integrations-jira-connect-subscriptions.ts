import { defineTool } from '@usemcpkit/core';

export const metaJiraConnectSubscriptionsCreateIntegrationsJiraConnectSubscriptions = defineTool({
  name: 'meta:jira_connect_subscriptions:create_integrations_jira_connect_subscriptions',
  description:
    'Subscribe a namespace to a JiraConnectInstallation. Subscribes the namespace to the JiraConnectInstallation',
  input: {
    type: 'object',
    properties: {
      jwt: {
        type: 'string',
        description: 'JWT token for authorization with the Jira Connect installation.',
      },
      namespace_path: {
        type: 'string',
        description: 'Path for the namespace that should be subscribed.',
      },
    },
    required: ['jwt', 'namespace_path'],
  },
  request: {
    method: 'POST',
    path: '/integrations/jira_connect/subscriptions',
    body: ['jwt', 'namespace_path'],
  },
});
