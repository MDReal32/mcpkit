import { defineTool } from '@usemcpkit/core';

export const appsSuspendInstallation = defineTool({
  name: 'apps:suspend_installation',
  description:
    "Suspend an app installation. Suspends a GitHub App on a user, organization, or enterprise account, which blocks the app from accessing the account's resources. When a GitHub App is suspended, the app's access to the GitHub API or webhook events is blocked for that account.",
  input: {
    type: 'object',
    properties: {
      installation_id: {
        type: 'integer',
        description: 'The unique identifier of the installation.',
      },
    },
    required: ['installation_id'],
  },
  request: {
    method: 'PUT',
    path: '/app/installations/{installation_id}/suspended',
  },
});
