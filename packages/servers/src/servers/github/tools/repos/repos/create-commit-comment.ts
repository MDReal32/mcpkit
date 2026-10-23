import { defineTool } from '@usemcpkit/core';

export const reposReposCreateCommitComment = defineTool({
  name: 'repos:repos:create_commit_comment',
  description: 'Create a commit comment. Create a comment for a commit using its `:commit_sha`.',
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
      commit_sha: {
        type: 'string',
        description: 'The SHA of the commit.',
      },
      body: {
        type: 'string',
        description: 'The contents of the comment.',
      },
      path: {
        type: 'string',
        description: 'Relative path of the file to comment on.',
      },
      position: {
        type: 'integer',
        description: 'Line index in the diff to comment on.',
      },
      line: {
        type: 'integer',
        description:
          '**Closing down notice**. Use **position** parameter instead. Line number in the file to comment on.',
      },
    },
    required: ['owner', 'repo', 'commit_sha', 'body'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/commits/{commit_sha}/comments',
    body: ['body', 'path', 'position', 'line'],
  },
});
