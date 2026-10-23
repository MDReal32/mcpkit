import { defineTool } from '@usemcpkit/core';

export const reposCreateOrUpdateFileContents = defineTool({
  name: 'repos:create_or_update_file_contents',
  description: 'Create or update file contents. Creates a new file or replaces an existing file in a repository.',
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
      content: {
        type: 'string',
        description: 'The new file content, using Base64 encoding.',
      },
      sha: {
        type: 'string',
        description: '**Required if you are updating a file**. The blob SHA of the file being replaced.',
      },
      branch: {
        type: 'string',
        description: 'The branch name. Default: the repository’s default branch.',
      },
      committer: {
        type: 'object',
        description: 'The person that committed the file. Default: the authenticated user.',
        properties: {
          name: {
            type: 'string',
            description:
              "The name of the author or committer of the commit. You'll receive a `422` status code if `name` is omitted.",
          },
          email: {
            type: 'string',
            description:
              "The email of the author or committer of the commit. You'll receive a `422` status code if `email` is omitted.",
          },
          date: {
            type: 'string',
          },
        },
        required: ['name', 'email'],
      },
      author: {
        type: 'object',
        description:
          'The author of the file. Default: The `committer` or the authenticated user if you omit `committer`.',
        properties: {
          name: {
            type: 'string',
            description:
              "The name of the author or committer of the commit. You'll receive a `422` status code if `name` is omitted.",
          },
          email: {
            type: 'string',
            description:
              "The email of the author or committer of the commit. You'll receive a `422` status code if `email` is omitted.",
          },
          date: {
            type: 'string',
          },
        },
        required: ['name', 'email'],
      },
    },
    required: ['owner', 'repo', 'path', 'message', 'content'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/contents/{path}',
    body: ['message', 'content', 'sha', 'branch', 'committer', 'author'],
  },
});
