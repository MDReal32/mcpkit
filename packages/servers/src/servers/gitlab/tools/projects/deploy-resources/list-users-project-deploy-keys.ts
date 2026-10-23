import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesListUsersProjectDeployKeys = defineTool({
  name: 'projects:deploy_resources:list_users_project_deploy_keys',
  description: 'List all project deploy keys for a user. Lists all project deploy keys accessible to a specified user.',
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
    path: '/users/{user_id}/project_deploy_keys',
    query: ['page', 'per_page'],
  },
});
