import { defineTool } from '@usemcpkit/core';

export const codeScanningGetAiScanEnablement = defineTool({
  name: 'code_scanning:get_ai_scan_enablement',
  description: 'Get AI Scan enablement for a repository. Gets whether AI Scan is enabled for a repository.',
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
    path: '/repos/{owner}/{repo}/code-scanning/ai-scan',
  },
});
