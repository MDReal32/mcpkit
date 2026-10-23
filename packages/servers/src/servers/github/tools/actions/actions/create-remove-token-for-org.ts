import { defineTool } from '@usemcpkit/core';

export const actionsActionsCreateRemoveTokenForOrg = defineTool({
  name: 'actions:actions:create_remove_token_for_org',
  description:
    'Create a remove token for an organization. Returns a token that you can pass to the `config` script to remove a self-hosted runner from an organization. The token expires after one hour.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/actions/runners/remove-token',
  },
});
