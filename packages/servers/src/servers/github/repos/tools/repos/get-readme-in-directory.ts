import { defineTool } from '@usemcpkit/core';

export const reposGetReadmeInDirectory = defineTool({
  name: 'repos:get_readme_in_directory',
  description: 'Get a repository README for a directory. Gets the README from a repository directory.',
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
      dir: {
        type: 'string',
        description: 'The alternate path to look for a README file',
      },
      ref: {
        type: 'string',
        description: 'The name of the commit/branch/tag. Default: the repository’s default branch.',
      },
    },
    required: ['owner', 'repo', 'dir'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/readme/{dir}',
    query: ['ref'],
  },
});
