import { defineTool } from '@usemcpkit/core';

export const orgsListPendingInvitations = defineTool({
  name: 'orgs:list_pending_invitations',
  description:
    'List pending organization invitations. The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, or `hiring_manager`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      role: {
        type: 'string',
        default: 'all',
        enum: ['all', 'admin', 'direct_member', 'billing_manager', 'hiring_manager'],
        description: 'Filter invitations by their member role.',
      },
      invitation_source: {
        type: 'string',
        default: 'all',
        enum: ['all', 'member', 'scim'],
        description: 'Filter invitations by their invitation source.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/invitations',
    query: ['per_page', 'page', 'role', 'invitation_source'],
  },
});
