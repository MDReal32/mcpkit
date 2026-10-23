import { defineTool } from '@usemcpkit/core';

export const groupsInvitationsCreateGroupsInvitations = defineTool({
  name: 'groups:invitations:create_groups_invitations',
  description:
    'Add a member to a group. Adds a member to a group. You can specify a user ID or invite a user by email.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      access_level: {
        type: 'integer',
        description: 'Access level to grant to the invited user. For a list of values, see roles.',
        enum: [10, 15, 20, 25, 30, 40, 50, 5],
      },
      email: {
        type: 'array',
        description:
          'Email address of the member to invite, or multiple email addresses separated by commas. Required if `user_id` is not provided.',
        items: {
          type: 'string',
        },
      },
      user_id: {
        type: 'array',
        description:
          'ID of the user to invite, or multiple IDs separated by commas. Required if `email` is not provided.',
        items: {
          type: 'string',
        },
      },
      expires_at: {
        type: 'string',
        description: 'Date when the invitation expires.',
      },
      invite_source: {
        type: 'string',
        description: 'Source of the invitation that starts the member creation process.',
        default: 'invitations-api',
      },
      member_role_id: {
        type: 'integer',
        description: 'ID of a member role to assign to the invited user. Ultimate only.',
      },
    },
    required: ['id', 'access_level'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/invitations',
    body: ['access_level', 'email', 'user_id', 'expires_at', 'invite_source', 'member_role_id'],
  },
});
