import { defineTool } from '@usemcpkit/core';

export const ciCiTriggersListProjectsTriggers = defineTool({
  name: 'ci:ci_triggers:list_projects_triggers',
  description: 'List all project trigger tokens. Lists all pipeline trigger tokens for a specified project.',
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
    path: '/projects/{id}/triggers',
    query: ['page', 'per_page'],
  },
});
