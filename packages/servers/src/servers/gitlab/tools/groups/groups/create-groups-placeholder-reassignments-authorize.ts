import { defineTool } from '@usemcpkit/core';

export const groupsGroupsCreateGroupsPlaceholderReassignmentsAuthorize = defineTool({
  name: 'groups:groups:create_groups_placeholder_reassignments_authorize',
  description:
    'Workhorse authorization for the reassignment CSV file. Authorizes Workhorse to handle CSV file uploads for placeholder reassignments. This feature was introduced in GitLab 17.10',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/placeholder_reassignments/authorize',
  },
});
