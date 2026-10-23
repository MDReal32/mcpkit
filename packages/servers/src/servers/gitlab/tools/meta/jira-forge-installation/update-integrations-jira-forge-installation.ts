import { defineTool } from '@usemcpkit/core';

export const metaJiraForgeInstallationUpdateIntegrationsJiraForgeInstallation = defineTool({
  name: 'meta:jira_forge_installation:update_integrations_jira_forge_installation',
  description:
    'Update the GitLab for Jira (Forge) installation instance URL. Sets the GitLab instance the installation points at. Omit instance_url (or send null) for GitLab.com. Requires a Jira site or organization admin.',
  input: {
    type: 'object',
    properties: {
      instance_url: {
        type: 'string',
        description: 'Base URL of the self-managed GitLab instance; null for GitLab.com',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/integrations/jira_forge/installation',
    body: ['instance_url'],
  },
});
