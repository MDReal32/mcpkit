import { defineTool } from '@usemcpkit/core';

export const teamsListPendingInvitationsInOrg = defineTool({
  name: 'teams:list_pending_invitations_in_org',
  description:
    'List pending team invitations. The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, `hiring_manager`, or `reinstate`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      team_slug: {
        type: 'string',
        description: 'The slug of the team name.',
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
    },
    required: ['org', 'team_slug'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/teams/{team_slug}/invitations',
    query: ['per_page', 'page'],
  },
});
