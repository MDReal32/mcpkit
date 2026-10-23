import { defineTool } from '@usemcpkit/core';

export const groupsInvitationsListGroupsInvitations = defineTool({
  name: 'groups:invitations:list_groups_invitations',
  description:
    'List all pending invitations for a group. Lists all pending invitations for a specified group viewable by the authenticated user. Returns invitations to direct members only, and not through inherited ancestor groups. This function takes pagination parameters `page` and `per_page` to restrict the list of members.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
      query: {
        type: 'string',
        description:
          'Return only invitations sent to this email address. Must match exactly. If omitted, returns all invitations.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/invitations',
    query: ['page', 'per_page', 'query'],
  },
});
