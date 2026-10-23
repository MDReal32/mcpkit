import { defineTool } from '@usemcpkit/core';

export const usersCustomAttributesDeleteGroupsCustomAttributes = defineTool({
  name: 'users:custom_attributes:delete_groups_custom_attributes',
  description: 'Delete a custom attribute for a group. Deletes a specified custom attribute for a group.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Key of the custom attribute.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['key', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/custom_attributes/{key}',
  },
});
