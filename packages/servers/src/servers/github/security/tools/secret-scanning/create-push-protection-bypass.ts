import { defineTool } from '@usemcpkit/core';

export const secretScanningCreatePushProtectionBypass = defineTool({
  name: 'secret_scanning:create_push_protection_bypass',
  description: 'Create a push protection bypass. Creates a bypass for a previously push protected secret.',
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
      reason: {
        type: 'string',
        description: 'The reason for bypassing push protection.',
        enum: ['false_positive', 'used_in_tests', 'will_fix_later'],
      },
      placeholder_id: {
        type: 'string',
        description:
          'The ID of the push protection bypass placeholder. This value is returned on any push protected routes.',
      },
    },
    required: ['owner', 'repo', 'reason', 'placeholder_id'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/secret-scanning/push-protection-bypasses',
    body: ['reason', 'placeholder_id'],
  },
});
