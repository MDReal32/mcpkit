import { defineTool } from '@usemcpkit/core';

export const issuesProjectsGetFieldForUser = defineTool({
  name: 'issues:projects:get_field_for_user',
  description: 'Get project field for user. Get a specific field for a user-owned project.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      field_id: {
        type: 'integer',
        description: 'The unique identifier of the field.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
    },
    required: ['project_number', 'field_id', 'username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2/{project_number}/fields/{field_id}',
  },
});
