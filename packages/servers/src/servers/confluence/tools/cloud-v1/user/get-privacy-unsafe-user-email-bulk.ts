import { defineTool } from '@usemcpkit/core';

export const cloudV1UserGetPrivacyUnsafeUserEmailBulk = defineTool({
  name: 'cloud_v1:user:get_privacy_unsafe_user_email_bulk',
  description:
    "[Cloud v1] Get user email addresses in batch. Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is only available to apps approved by Atlassian, according to these guidelines. For Forge apps, this API only supports access via asApp() requests.",
  input: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description: 'The account IDs of the users. (comma-separated)',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/user/email/bulk',
    query: ['accountId'],
  },
});
