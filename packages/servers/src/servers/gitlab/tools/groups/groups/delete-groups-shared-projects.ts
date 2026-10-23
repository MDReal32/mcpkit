import { defineTool } from '@usemcpkit/core';

export const groupsGroupsDeleteGroupsSharedProjects = defineTool({
  name: 'groups:groups:delete_groups_shared_projects',
  description:
    'Remove a shared project from a group. Removes a shared project targeting this group. The group Owner can remove a shared project without access to the source project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      project_id: {
        type: 'integer',
        description: 'ID of the shared project.',
      },
    },
    required: ['id', 'project_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/shared_projects/{project_id}',
  },
});
