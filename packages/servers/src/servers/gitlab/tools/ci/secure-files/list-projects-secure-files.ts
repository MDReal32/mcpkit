import { defineTool } from '@usemcpkit/core';

export const ciSecureFilesListProjectsSecureFiles = defineTool({
  name: 'ci:secure_files:list_projects_secure_files',
  description: 'List all secure files for a project. Lists all secure files for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/secure_files',
    query: ['page', 'per_page'],
  },
});
