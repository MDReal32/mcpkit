import { defineTool } from '@usemcpkit/core';

export const metaJiraForgeUserDelegationCreateIntegrationsJiraForgeUserDelegation = defineTool({
  name: 'meta:jira_forge_user_delegation:create_integrations_jira_forge_user_delegation',
  description:
    'Create a GitLab for Jira (Forge) user delegation token. Mints a short-lived GitLab-signed token identifying the signed-in GitLab user, scoped to the Jira account and site it is minted for. Accepts only the OAuth token issued to the Forge app at sign-in. The Forge app stores it at config-page sign-in and presents it on the FIT-authenticated subscribe call, which cannot carry the user OAuth token (Forge attaches the FIT only to app-context calls); the s…',
  input: {
    type: 'object',
    properties: {
      account_id: {
        type: 'string',
        description: 'Jira account id the delegation is scoped to',
      },
      cloud_id: {
        type: 'string',
        description: 'Jira site (cloud) id the delegation is scoped to',
      },
    },
    required: ['account_id', 'cloud_id'],
  },
  request: {
    method: 'POST',
    path: '/integrations/jira_forge/user_delegation',
    body: ['account_id', 'cloud_id'],
  },
});
