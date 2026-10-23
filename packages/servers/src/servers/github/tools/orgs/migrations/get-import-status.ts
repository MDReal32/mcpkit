import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsGetImportStatus = defineTool({
  name: 'orgs:migrations:get_import_status',
  description: '[Deprecated] Get an import status. View the progress of an import.',
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
    method: 'GET',
    path: '/repos/{owner}/{repo}/import',
  },
});
