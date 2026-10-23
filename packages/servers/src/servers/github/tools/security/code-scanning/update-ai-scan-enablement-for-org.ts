import { defineTool } from '@usemcpkit/core';

export const securityCodeScanningUpdateAiScanEnablementForOrg = defineTool({
  name: 'security:code_scanning:update_ai_scan_enablement_for_org',
  description: 'Update the AI Scan setting for an organization. Updates the AI Scan setting stored on an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pr_scan: {
        type: 'string',
        description:
          'Whether AI Scan is enabled for the organization. Organization respects enterprise policy. Disabled organizations prevent repositories from enabling AI Scan. Enabled organizations enable AI Scan for their repositories, but individual repositories can opt out.',
        enum: ['enabled', 'disabled'],
      },
    },
    required: ['org'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/code-scanning/ai-scan',
    body: ['pr_scan'],
  },
});
