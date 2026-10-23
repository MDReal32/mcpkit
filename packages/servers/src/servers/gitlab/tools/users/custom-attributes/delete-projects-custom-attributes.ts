import { defineTool } from '@usemcpkit/core';

export const usersCustomAttributesDeleteProjectsCustomAttributes = defineTool({
  name: 'users:custom_attributes:delete_projects_custom_attributes',
  description: 'Delete a custom attribute for a project. Deletes a specified custom attribute for a project.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Key of the custom attribute.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['key', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/custom_attributes/{key}',
  },
});
