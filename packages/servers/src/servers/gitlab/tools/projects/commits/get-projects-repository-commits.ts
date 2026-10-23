import { defineTool } from '@usemcpkit/core';

export const projectsCommitsGetProjectsRepositoryCommits = defineTool({
  name: 'projects:commits:get_projects_repository_commits',
  description:
    'Retrieve a commit. Retrieves a specified commit identified by the commit hash or name of a branch or tag.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sha: {
        type: 'string',
        description: 'Commit SHA or name of a repository branch or tag.',
      },
      stats: {
        type: 'boolean',
        default: true,
        description: 'If `true`, includes commit statistics in the response.',
      },
    },
    required: ['id', 'sha'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/commits/{sha}',
    query: ['stats'],
  },
});
