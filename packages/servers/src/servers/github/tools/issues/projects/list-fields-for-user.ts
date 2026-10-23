import { defineTool } from '@usemcpkit/core';

export const issuesProjectsListFieldsForUser = defineTool({
  name: 'issues:projects:list_fields_for_user',
  description: 'List project fields for user. List all fields for a specific user-owned project.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['project_number', 'username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2/{project_number}/fields',
    query: ['per_page', 'before', 'after'],
  },
});
