import { defineTool } from '@usemcpkit/core';

export const metaJiraForgeSubscriptionsDeleteIntegrationsJiraForgeSubscriptions = defineTool({
  name: 'meta:jira_forge_subscriptions:delete_integrations_jira_forge_subscriptions',
  description:
    'Delete a GitLab for Jira (Forge) namespace subscription. Unsubscribes a GitLab namespace from the Forge installation.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the subscription.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/integrations/jira_forge/subscriptions/{id}',
  },
});
