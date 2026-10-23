import { defineTool } from '@usemcpkit/core';

export const agentsDeleteOrgVariable = defineTool({
  name: 'agents:delete_org_variable',
  description: 'Delete an organization variable. Deletes an organization agent variable using the variable name.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the variable.',
      },
    },
    required: ['org', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/agents/variables/{name}',
  },
});
