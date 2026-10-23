import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningGetSarif = defineTool({
  name: 'security:code_scanning:get_sarif',
  description:
    'Get information about a SARIF upload. Gets information about a SARIF upload, including the status and the URL of the analysis that was uploaded so that you can retrieve details of the analysis. For more information, see "Get a code scanning analysis for a repository." OAuth app tokens and personal access tokens (classic) need the `security_events` scope to use this endpoint with private or public repositories, or the `public_repo` sc…',
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
      sarif_id: {
        type: 'string',
        description: 'The SARIF ID obtained after uploading.',
      },
    },
    required: ['owner', 'repo', 'sarif_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}',
  },
});
