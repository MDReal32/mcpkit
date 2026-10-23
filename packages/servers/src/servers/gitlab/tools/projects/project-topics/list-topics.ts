import { defineTool } from '@usemcpkit/core';

export const projectsProjectTopicsListTopics = defineTool({
  name: 'projects:project_topics:list_topics',
  description: 'List all topics. Lists all project topics sorted by the number of associated projects.',
  input: {
    type: 'object',
    properties: {
      search: {
        type: 'string',
        description: 'Search topics against their `name`.',
      },
      without_projects: {
        type: 'boolean',
        description: 'If `true`, returns only topics that have no assigned projects.',
      },
      organization_id: {
        type: 'integer',
        description: 'Filter topics by organization ID.',
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
  },
  request: {
    method: 'GET',
    path: '/topics',
    query: ['search', 'without_projects', 'organization_id', 'page', 'per_page'],
  },
});
