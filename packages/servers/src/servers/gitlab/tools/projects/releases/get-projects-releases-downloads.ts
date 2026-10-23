import { defineTool } from '@usemcpkit/core';

export const projectsReleasesGetProjectsReleasesDownloads = defineTool({
  name: 'projects:releases:get_projects_releases_downloads',
  description: 'Download a project release asset file. This feature was introduced in GitLab 15.4.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      tag_name: {
        type: 'string',
        description: 'Git tag the release is associated with.',
      },
      direct_asset_path: {
        type: 'string',
        description: 'The path to the file to download, as specified when creating the release asset',
      },
    },
    required: ['id', 'tag_name', 'direct_asset_path'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/releases/{tag_name}/downloads/{direct_asset_path}',
  },
});
