import { defineTool } from '@usemcpkit/core';

export const ciCiVariablesGetAdminCiVariables = defineTool({
  name: 'ci:ci_variables:get_admin_ci_variables',
  description: 'Retrieve instance variable details. Retrieves details of a specified instance-level variable.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description:
          'Key of the instance variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.',
      },
    },
    required: ['key'],
  },
  request: {
    method: 'GET',
    path: '/admin/ci/variables/{key}',
  },
});
