import { defineTool } from '@usemcpkit/core';

export const ciCiVariablesDeleteAdminCiVariables = defineTool({
  name: 'ci:ci_variables:delete_admin_ci_variables',
  description: 'Delete instance variable. Deletes a specified instance variable.',
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
    method: 'DELETE',
    path: '/admin/ci/variables/{key}',
  },
});
