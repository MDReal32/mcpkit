import { defineTool } from '@usemcpkit/core';

export const groupsAccessRequestsDeleteGroupsAccessRequests = defineTool({
  name: 'groups:access_requests:delete_groups_access_requests',
  description: 'Deny an access request. Denies an access request for a specified user in a group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the user requesting access.',
      },
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/access_requests/{user_id}',
  },
});
