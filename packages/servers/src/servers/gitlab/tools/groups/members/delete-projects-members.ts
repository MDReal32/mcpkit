import { defineTool } from '@usemcpkit/core';

export const groupsMembersDeleteProjectsMembers = defineTool({
  name: 'groups:members:delete_projects_members',
  description:
    'Remove a member from a project. Removes a specified user from a project. The user must be a direct member.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      user_id: {
        type: 'integer',
        description: 'User ID of the member.',
      },
      skip_subresources: {
        type: 'boolean',
        default: false,
        description: 'If `true`, skips deleting direct memberships of the removed member in subgroups and projects.',
      },
      unassign_issuables: {
        type: 'boolean',
        default: false,
        description: 'If `true`, unassigns the member from any issues or merge requests in the project.',
      },
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/members/{user_id}',
    query: ['skip_subresources', 'unassign_issuables'],
  },
});
