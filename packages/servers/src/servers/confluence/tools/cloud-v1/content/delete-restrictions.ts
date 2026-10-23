import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentDeleteRestrictions = defineTool({
  name: 'cloud_v1:content:delete_restrictions',
  description: '[Cloud v1] Delete restrictions. Removes all restrictions (read and update) on a piece of content.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content to remove restrictions from.',
      },
      expand: {
        type: 'string',
        description:
          'A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand. (comma-separated)',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/restriction',
    query: ['expand'],
  },
});
