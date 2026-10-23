import { defineTool } from '@usemcpkit/core';

export const groupsMembersUpdateProjectsMembers = defineTool({
  name: 'groups:members:update_projects_members',
  description: 'Update a project member. Updates a specified member of a project.',
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
      access_level: {
        type: 'integer',
        description: 'A valid access level',
      },
      expires_at: {
        type: 'string',
        description: 'Date string in the format YEAR-MONTH-DAY',
      },
      member_role_id: {
        type: 'integer',
        description:
          'ID of a custom member role to assign to the member. Set to `null` to remove all custom roles. Ultimate only.',
      },
    },
    required: ['id', 'user_id', 'access_level'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/members/{user_id}',
    body: ['access_level', 'expires_at', 'member_role_id'],
  },
});
