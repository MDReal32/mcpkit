import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsCancelImport = defineTool({
  name: 'orgs:migrations:cancel_import',
  description: '[Deprecated] Cancel an import. Stop an import for a repository.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/import',
  },
});
