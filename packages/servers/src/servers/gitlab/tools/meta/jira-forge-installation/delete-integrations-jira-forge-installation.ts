import { defineTool } from '@usemcpkit/core';

export const metaJiraForgeInstallationDeleteIntegrationsJiraForgeInstallation = defineTool({
  name: 'meta:jira_forge_installation:delete_integrations_jira_forge_installation',
  description:
    'Destroy the GitLab for Jira (Forge) installation on app uninstall. Called by the Forge app preUninstall hook. A pure-native install fires no Connect uninstalled event, so this is what removes the installation, its subscriptions, and deactivates the linked jira_cloud_app integrations. FIT authentication carries the same trust as the signed Connect lifecycle event, so no Jira admin check is needed. Succeeds with no change when the installation is already gone.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/integrations/jira_forge/installation',
  },
});
