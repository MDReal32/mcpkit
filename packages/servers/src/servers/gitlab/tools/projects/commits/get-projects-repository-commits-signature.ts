import { defineTool } from '@usemcpkit/core';

export const projectsCommitsGetProjectsRepositoryCommitsSignature = defineTool({
  name: 'projects:commits:get_projects_repository_commits_signature',
  description:
    'Retrieve a commit signature. Retrieves the signature from a commit, if it is signed. For unsigned commits, it results in a 404 response.',
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
    },
    required: ['id', 'sha'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/commits/{sha}/signature',
  },
});
