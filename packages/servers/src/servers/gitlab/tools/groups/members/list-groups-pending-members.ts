import { defineTool } from '@usemcpkit/core';

export const groupsMembersListGroupsPendingMembers = defineTool({
  name: 'groups:members:list_groups_pending_members',
  description:
    'List all pending group members. Lists all members in an `awaiting` state and those who are invited but do not have a GitLab account for a specified group and any subgroups and projects. This operation works on top-level groups only. It does not work on subgroups.',
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/pending_members',
    query: ['page', 'per_page'],
  },
});
