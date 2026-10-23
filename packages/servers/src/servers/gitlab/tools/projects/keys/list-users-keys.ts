import { defineTool } from '@usemcpkit/core';

export const projectsKeysListUsersKeys = defineTool({
  name: 'projects:keys:list_users_keys',
  description: 'List all SSH keys for a user. Lists all SSH keys for a specified user account.',
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'ID or username of the user.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['user_id'],
  },
  request: {
    method: 'GET',
    path: '/users/{user_id}/keys',
    query: ['page', 'per_page'],
  },
});
