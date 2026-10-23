import { defineTool } from '@usemcpkit/core';

export const appsDeleteInstallation = defineTool({
  name: 'apps:delete_installation',
  description:
    'Delete an installation for the authenticated app. Uninstalls a GitHub App on a user, organization, or enterprise account. If you prefer to temporarily suspend an app\'s access to your account\'s resources, then we recommend the "Suspend an app installation" endpoint.',
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
    method: 'DELETE',
    path: '/app/installations/{installation_id}',
  },
});
