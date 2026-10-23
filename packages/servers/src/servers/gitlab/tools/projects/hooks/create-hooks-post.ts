import { defineTool } from '@usemcpkit/core';

export const projectsHooksCreateHooksPost = defineTool({
  name: 'projects:hooks:create_hooks_post',
  description: 'Create a test run. Creates a test run for a webhook. Executes the webhook with mock data.',
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
    method: 'POST',
    path: '/hooks/{hook_id}',
  },
});
