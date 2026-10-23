import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteFile = defineTool({
  name: 'repos:repos:delete_file',
  description: 'Delete a file. Deletes a file in a repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      path: {
        type: 'string',
        description: 'path parameter',
      },
      message: {
        type: 'string',
        description: 'The commit message.',
      },
      sha: {
        type: 'string',
        description: 'The blob SHA of the file being deleted.',
      },
      branch: {
        type: 'string',
        description: 'The branch name. Default: the repository’s default branch',
      },
      committer: {
        type: 'object',
        description: 'object containing information about the committer.',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the author (or committer) of the commit',
          },
          email: {
            type: 'string',
            description: 'The email of the author (or committer) of the commit',
          },
        },
      },
      author: {
        type: 'object',
        description: 'object containing information about the author.',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the author (or committer) of the commit',
          },
          email: {
            type: 'string',
            description: 'The email of the author (or committer) of the commit',
          },
        },
      },
    },
    required: ['owner', 'repo', 'path', 'message', 'sha'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/contents/{path}',
    body: ['message', 'sha', 'branch', 'committer', 'author'],
  },
});
