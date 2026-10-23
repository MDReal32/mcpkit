import { defineTool } from '@usemcpkit/core';

export const cloudV1UserGetPrivacyUnsafeUserEmail = defineTool({
  name: 'cloud_v1:user:get_privacy_unsafe_user_email',
  description:
    "[Cloud v1] Get user email address. Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is only available to apps approved by Atlassian, according to these guidelines. For Forge apps, this API only supports access via asApp() requests.",
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`. Required.',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/user/email',
    query: ['accountId'],
  },
});
