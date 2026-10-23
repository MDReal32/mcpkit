import { defineTool } from '@usemcpkit/core';

export const projectsHooksGetHooks = defineTool({
  name: 'projects:hooks:get_hooks',
  description: 'Retrieve a system hook. Retrieves a specified system hook.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the system hook.',
      },
    },
    required: ['hook_id'],
  },
  request: {
    method: 'GET',
    path: '/hooks/{hook_id}',
  },
});
