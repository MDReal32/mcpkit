import { defineTool } from '@usemcpkit/core';

export const appsAppsDeleteToken = defineTool({
  name: 'apps:apps:delete_token',
  description:
    'Delete an app token. OAuth or GitHub application owners can revoke a single token for an OAuth application or a GitHub application with an OAuth authorization.',
  input: {
    type: 'object',
    properties: {
      client_id: {
        type: 'string',
        description: 'The client ID of the GitHub app.',
      },
      access_token: {
        type: 'string',
        description: 'The OAuth access token used to authenticate to the GitHub API.',
      },
    },
    required: ['client_id', 'access_token'],
  },
  request: {
    method: 'DELETE',
    path: '/applications/{client_id}/token',
    body: ['access_token'],
  },
});
