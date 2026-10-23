import { defineTool } from '@usemcpkit/core';

export const codeScanningListCodeqlDatabases = defineTool({
  name: 'code_scanning:list_codeql_databases',
  description: 'List CodeQL databases for a repository. Lists the CodeQL databases that are available in a repository.',
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
    path: '/repos/{owner}/{repo}/code-scanning/codeql/databases',
  },
});
