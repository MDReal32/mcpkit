import { defineTool } from '@usemcpkit/core';

export const usersCustomAttributesGetGroupsCustomAttributes = defineTool({
  name: 'users:custom_attributes:get_groups_custom_attributes',
  description: 'Retrieve a custom attribute for a group. Retrieves a specified custom attribute for a group.',
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
    method: 'GET',
    path: '/groups/{id}/custom_attributes/{key}',
  },
});
