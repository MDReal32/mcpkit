import { defineTool } from '@usemcpkit/core';

export const projectsGitlabPagesGetProjectsPages = defineTool({
  name: 'projects:gitlab_pages:get_projects_pages',
  description:
    'Retrieve Pages settings for a project. Retrieves Pages settings for a specified project. You must have the Maintainer or Owner role for the project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/pages',
  },
});
