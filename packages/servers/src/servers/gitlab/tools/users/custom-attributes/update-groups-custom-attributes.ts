import { defineTool } from '@usemcpkit/core';

export const usersCustomAttributesUpdateGroupsCustomAttributes = defineTool({
  name: 'users:custom_attributes:update_groups_custom_attributes',
  description:
    'Creates or updates a custom attribute for a group. Creates or updates a custom attribute for a specified group. If the attribute already exists, it is updated, otherwise a new attribute is created.',
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
      value: {
        type: 'string',
        description: 'Value of the custom attribute.',
      },
    },
    required: ['key', 'id', 'value'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/custom_attributes/{key}',
    body: ['value'],
  },
});
