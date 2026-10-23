import { defineTool } from '@usemcpkit/core';

export const projectsReleasesGetProjectsReleasesPermalinkLatestGet = defineTool({
  name: 'projects:releases:get_projects_releases_permalink_latest_get',
  description: 'Get the latest project release. This feature was introduced in GitLab 15.4.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      suffix_path: {
        type: 'string',
        description: 'The path to be suffixed to the latest release',
      },
    },
    required: ['id', 'suffix_path'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/releases/permalink/latest/{suffix_path}',
  },
});
