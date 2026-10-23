import { defineTool } from '@usemcpkit/core';

export const issuesEpicsDeleteGroupsEpicsIssues = defineTool({
  name: 'issues:epics:delete_groups_epics_issues',
  description: 'Remove an issue from the epic. Removes an issue from the epic. Does not delete the issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'string',
        description: 'Internal ID of the epic.',
      },
      epic_issue_id: {
        type: 'string',
        description: 'ID of the association.',
      },
    },
    required: ['id', 'epic_iid', 'epic_issue_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/(-/)epics/{epic_iid}/issues/{epic_issue_id}',
  },
});
