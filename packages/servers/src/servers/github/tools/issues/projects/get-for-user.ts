import { defineTool } from '@usemcpkit/core';

export const issuesProjectsGetForUser = defineTool({
  name: 'issues:projects:get_for_user',
  description: 'Get project for user. Get a specific user-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['project_number', 'username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2/{project_number}',
  },
});
