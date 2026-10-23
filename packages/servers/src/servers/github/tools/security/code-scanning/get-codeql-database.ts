import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningGetCodeqlDatabase = defineTool({
  name: 'security:code_scanning:get_codeql_database',
  description: 'Get a CodeQL database for a repository. Gets a CodeQL database for a language in a repository.',
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
      language: {
        type: 'string',
        description: 'The language of the CodeQL database.',
      },
    },
    required: ['owner', 'repo', 'language'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}',
  },
});
