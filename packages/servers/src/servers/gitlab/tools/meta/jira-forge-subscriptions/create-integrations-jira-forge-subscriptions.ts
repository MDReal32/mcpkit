import { defineTool } from '@usemcpkit/core';

export const metaJiraForgeSubscriptionsCreateIntegrationsJiraForgeSubscriptions = defineTool({
  name: 'meta:jira_forge_subscriptions:create_integrations_jira_forge_subscriptions',
  description:
    'Create a GitLab for Jira (Forge) namespace subscription. Subscribes a GitLab namespace to the Forge installation so its development data syncs to Jira. Authenticated by the Forge Invocation Token (app-context call); the GitLab user is bound via the signed delegation token from the user_delegation endpoint, and the Jira site-admin check runs against Jira with the app system token riding the call.',
  input: {
    type: 'object',
    properties: {
      namespace_path: {
        type: 'string',
        description: 'Path of the namespace to subscribe.',
      },
    },
    required: ['namespace_path'],
  },
  request: {
    method: 'POST',
    path: '/integrations/jira_forge/subscriptions',
    body: ['namespace_path'],
  },
});
