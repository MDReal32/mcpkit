import { defineTool } from '@usemcpkit/core';

export const ciCiVariablesDeleteGroupsVariables = defineTool({
  name: 'ci:ci_variables:delete_groups_variables',
  description:
    'Delete a group variable. Deletes a specified group variable. If there are multiple variables with the same key, use `filter` to select the correct `environment_scope`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      key: {
        type: 'string',
        description:
          'Key of the group variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/variables/{key}',
  },
});
