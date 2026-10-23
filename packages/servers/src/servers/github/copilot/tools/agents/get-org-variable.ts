import { defineTool } from '@usemcpkit/core';

export const agentsGetOrgVariable = defineTool({
  name: 'agents:get_org_variable',
  description: 'Get an organization variable. Gets a specific agent variable in an organization.',
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
    method: 'GET',
    path: '/orgs/{org}/agents/variables/{name}',
  },
});
