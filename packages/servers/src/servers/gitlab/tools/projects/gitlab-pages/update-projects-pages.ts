import { defineTool } from '@usemcpkit/core';

export const projectsGitlabPagesUpdateProjectsPages = defineTool({
  name: 'projects:gitlab_pages:update_projects_pages',
  description:
    'Update Pages settings for a project. Updates Pages settings for a specified project. You must have the Maintainer or Owner role for the project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      pages_unique_domain_enabled: {
        type: 'boolean',
        description: 'If `true`, uses a unique domain.',
      },
      pages_https_only: {
        type: 'boolean',
        description: 'If `true`, forces HTTPS.',
      },
      pages_primary_domain: {
        type: 'string',
        description:
          'Primary domain, from the existing assigned domains, to redirect all Pages requests to. Introduced in GitLab 17.8.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/pages',
    body: ['pages_unique_domain_enabled', 'pages_https_only', 'pages_primary_domain'],
  },
});
