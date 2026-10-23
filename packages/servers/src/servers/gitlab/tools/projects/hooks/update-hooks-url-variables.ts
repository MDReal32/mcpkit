import { defineTool } from '@usemcpkit/core';

export const projectsHooksUpdateHooksUrlVariables = defineTool({
  name: 'projects:hooks:update_hooks_url_variables',
  description: 'Update a URL variable. Updates a URL variable for a specified webhook.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the hook.',
      },
      key: {
        type: 'string',
        description: 'Key of the URL variable.',
      },
      value: {
        type: 'string',
        description: 'Value of the URL variable.',
      },
    },
    required: ['hook_id', 'key', 'value'],
  },
  request: {
    method: 'PUT',
    path: '/hooks/{hook_id}/url_variables/{key}',
    body: ['value'],
  },
});
