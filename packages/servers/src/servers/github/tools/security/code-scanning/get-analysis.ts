import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningGetAnalysis = defineTool({
  name: 'security:code_scanning:get_analysis',
  description:
    'Get a code scanning analysis for a repository. Gets a specified code scanning analysis for a repository.',
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
      analysis_id: {
        type: 'integer',
        description:
          'The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation.',
      },
    },
    required: ['owner', 'repo', 'analysis_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}',
  },
});
