import { defineTool } from '@usemcpkit/core';

export const appsAppDataPoliciesGetPolicies = defineTool({
  name: 'apps:app_data_policies:get_policies',
  description: 'Get data policy for projects. Returns data policies for the projects specified in the request.',
  input: {
    type: 'object',
    properties: {
      ids: {
        type: 'string',
        description: 'A list of project identifiers. This parameter accepts a comma-separated list.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/data-policy/project',
    query: ['ids'],
  },
});
