import { defineTool } from '@usemcpkit/core';

export const usersUsersDeleteSocialAccountForAuthenticatedUser = defineTool({
  name: 'users:users:delete_social_account_for_authenticated_user',
  description:
    "Delete social accounts for the authenticated user. Deletes one or more social accounts from the authenticated user's profile.",
  input: {
    type: 'object',
    properties: {
      account_urls: {
        type: 'array',
        description: 'Full URLs for the social media profiles to delete.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['account_urls'],
  },
  request: {
    method: 'DELETE',
    path: '/user/social_accounts',
    body: ['account_urls'],
  },
});
