import { defineTool } from '@usemcpkit/core';

export const orgsOrgsCreateInvitation = defineTool({
  name: 'orgs:orgs:create_invitation',
  description:
    'Create an organization invitation. Invite people to an organization by using their GitHub user ID or their email address. In order to create invitations in an organization, the authenticated user must be an organization owner.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      invitee_id: {
        type: 'integer',
        description: '**Required unless you provide `email`**. GitHub user ID for the person you are inviting.',
      },
      email: {
        type: 'string',
        description:
          '**Required unless you provide `invitee_id`**. Email address of the person you are inviting, which can be an existing GitHub user.',
      },
      role: {
        type: 'string',
        description:
          'The role for the new member. * `admin` - Organization owners with full administrative rights to the organization and complete access to all repositories and teams. * `direct_member` - Non-owner organization members with ability to see other members and join teams by invitation. * `billing_manager` - Non-owner organization members with ability to manage the billing settings of your organization. *…',
        default: 'direct_member',
        enum: ['admin', 'direct_member', 'billing_manager', 'reinstate'],
      },
      team_ids: {
        type: 'array',
        description: 'Specify IDs for the teams you want to invite new members to.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['org'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/invitations',
    body: ['invitee_id', 'email', 'role', 'team_ids'],
  },
});
