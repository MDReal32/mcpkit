import { defineTool } from '@usemcpkit/core';

export const projectsCommitsCreateProjectsRepositoryCommitsComments = defineTool({
  name: 'projects:commits:create_projects_repository_commits_comments',
  description:
    'Create a comment on a commit. Creates a comment on a commit. To comment on a specific line in a file, specify the full commit SHA, `path`, `line`, and set `line_type` to `new`.',
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
      note: {
        type: 'string',
        description: 'Text of the comment.',
      },
      path: {
        type: 'string',
        description: 'File path relative to the repository.',
      },
      line: {
        type: 'integer',
        description: 'Line number where the comment should be placed.',
      },
      line_type: {
        type: 'string',
        description: 'Line type.',
        default: 'new',
        enum: ['new', 'old'],
      },
    },
    required: ['id', 'sha', 'note', 'line', 'line_type'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/repository/commits/{sha}/comments',
    body: ['note', 'path', 'line', 'line_type'],
  },
});
