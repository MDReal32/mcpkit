import { defineTool } from '@usemcpkit/core';

export const projectsReleasesGetProjectsReleases = defineTool({
  name: 'projects:releases:get_projects_releases',
  description: 'Retrieve a release by tag name. Retrieves a release with a specified tag name.',
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
      include_html_description: {
        type: 'boolean',
        description: 'If `true`, the response includes HTML-rendered Markdown of the release description.',
      },
    },
    required: ['id', 'tag_name'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/releases/{tag_name}',
    query: ['include_html_description'],
  },
});
