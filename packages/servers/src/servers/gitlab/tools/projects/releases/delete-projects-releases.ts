import { defineTool } from '@usemcpkit/core';

export const projectsReleasesDeleteProjectsReleases = defineTool({
  name: 'projects:releases:delete_projects_releases',
  description:
    "Delete a release. Delete a release. Deleting a release doesn't delete the associated tag. Requires at least the Developer role for the project. This feature was introduced in GitLab 11.7.",
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
    },
    required: ['id', 'tag_name'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/releases/{tag_name}',
  },
});
