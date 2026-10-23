import { defineTool } from '@usemcpkit/core';

export const appsGetInstallation = defineTool({
  name: 'apps:get_installation',
  description:
    "Get an installation for the authenticated app. Enables an authenticated GitHub App to find an installation's information using the installation id.",
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
    method: 'GET',
    path: '/app/installations/{installation_id}',
  },
});
