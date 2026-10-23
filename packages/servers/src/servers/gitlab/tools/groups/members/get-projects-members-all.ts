import { defineTool } from '@usemcpkit/core';

export const groupsMembersGetProjectsMembersAll = defineTool({
  name: 'groups:members:get_projects_members_all',
  description:
    'Retrieve a project member. Retrieves a specified member of a project. Returns direct members and members inherited or invited through ancestor groups.',
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
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/members/all/{user_id}',
  },
});
