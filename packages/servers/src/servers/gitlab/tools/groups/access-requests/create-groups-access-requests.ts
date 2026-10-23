import { defineTool } from '@usemcpkit/core';

export const groupsAccessRequestsCreateGroupsAccessRequests = defineTool({
  name: 'groups:access_requests:create_groups_access_requests',
  description: 'Request access to a group. Requests access to a specified group for the authenticated user.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/access_requests',
  },
});
