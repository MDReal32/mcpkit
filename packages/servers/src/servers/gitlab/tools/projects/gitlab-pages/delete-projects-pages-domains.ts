import { defineTool } from '@usemcpkit/core';

export const projectsGitlabPagesDeleteProjectsPagesDomains = defineTool({
  name: 'projects:gitlab_pages:delete_projects_pages_domains',
  description: 'Delete Pages domain. Deletes a specified Pages domain in a project.',
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
    method: 'DELETE',
    path: '/projects/{id}/pages/domains/{domain}',
  },
});
