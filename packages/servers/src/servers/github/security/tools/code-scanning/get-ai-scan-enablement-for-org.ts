import { defineTool } from '@usemcpkit/core';

export const codeScanningGetAiScanEnablementForOrg = defineTool({
  name: 'code_scanning:get_ai_scan_enablement_for_org',
  description: 'Get the AI Scan setting for an organization. Gets the AI Scan setting stored on an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/code-scanning/ai-scan',
  },
});
