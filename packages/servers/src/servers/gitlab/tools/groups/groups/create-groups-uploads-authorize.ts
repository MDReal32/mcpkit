import { defineTool } from '@usemcpkit/core';

export const groupsGroupsCreateGroupsUploadsAuthorize = defineTool({
  name: 'groups:groups:create_groups_uploads_authorize',
  description: 'Workhorse authorize the file upload. This feature was introduced in GitLab 19.0',
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
    path: '/groups/{id}/uploads/authorize',
  },
});
