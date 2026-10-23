import { defineTool } from '@usemcpkit/core';

export const projectsCommitsCreateProjectsRepositoryCommitsCherryPick = defineTool({
  name: 'projects:commits:create_projects_repository_commits_cherry_pick',
  description: 'Cherry-pick a commit. Cherry-picks a commit to a specified branch.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sha: {
        type: 'string',
        description: 'Commit SHA, or name of a repository branch or tag, to cherry-pick.',
      },
      branch: {
        type: 'string',
        description: 'Name of the branch.',
      },
      dry_run: {
        type: 'boolean',
        description: 'If `true`, does not commit any changes.',
        default: false,
      },
      message: {
        type: 'string',
        description: 'Custom commit message to use for the new commit.',
      },
    },
    required: ['id', 'sha', 'branch'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/repository/commits/{sha}/cherry_pick',
    body: ['branch', 'dry_run', 'message'],
  },
});
