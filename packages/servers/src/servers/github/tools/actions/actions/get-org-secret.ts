import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetOrgSecret = defineTool({
  name: 'actions:actions:get_org_secret',
  description: 'Get an organization secret. Gets a single organization secret without revealing its encrypted value.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
    },
    required: ['org', 'secret_name'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/secrets/{secret_name}',
  },
});
