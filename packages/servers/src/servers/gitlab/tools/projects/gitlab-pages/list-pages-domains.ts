import { defineTool } from '@usemcpkit/core';

export const projectsGitlabPagesListPagesDomains = defineTool({
  name: 'projects:gitlab_pages:list_pages_domains',
  description:
    'List all Pages domains. Lists all Pages domains on the instance. You must have administrator access to the instance.',
  input: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'Domain of the GitLab Pages site to filter on.',
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
    path: '/pages/domains',
    query: ['domain', 'page', 'per_page'],
  },
});
