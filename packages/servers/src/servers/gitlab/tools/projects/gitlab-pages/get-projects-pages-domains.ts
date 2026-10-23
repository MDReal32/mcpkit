import { defineTool } from '@usemcpkit/core';

export const projectsGitlabPagesGetProjectsPagesDomains = defineTool({
  name: 'projects:gitlab_pages:get_projects_pages_domains',
  description:
    'Retrieve a Pages domain. Retrieves a Pages domain from a specified project. You must have permissions to view Pages domains.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      domain: {
        type: 'string',
        description: 'Custom domain.',
      },
    },
    required: ['id', 'domain'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/pages/domains/{domain}',
  },
});
