import { defineTool } from '@usemcpkit/core';

export const projectsHooksUpdateProjectsHooksCustomHeaders = defineTool({
  name: 'projects:hooks:update_projects_hooks_custom_headers',
  description: 'Update a custom header. Updates a custom header for a specified webhook.',
  input: {
    type: 'object',
    properties: {
      hook_id: {
        type: 'integer',
        description: 'ID of the hook.',
      },
      key: {
        type: 'string',
        description: 'Name of the custom header.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      value: {
        type: 'string',
        description: 'Value of the custom header.',
      },
    },
    required: ['hook_id', 'key', 'id', 'value'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/hooks/{hook_id}/custom_headers/{key}',
    body: ['value'],
  },
});
