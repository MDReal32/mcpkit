import { defineTool } from '@usemcpkit/core';

export const issuesEpicsUpdateGroupsEpicsIssues = defineTool({
  name: 'issues:epics:update_groups_epics_issues',
  description: 'Update a related epic link. Updates the relation of a specified issue to an epic.',
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
        description: 'ID of the epic-issue association to update.',
      },
      move_before_id: {
        type: 'string',
        description: 'ID of the epic-issue association to position before the issue.',
      },
      move_after_id: {
        type: 'string',
        description: 'ID of the epic-issue association to position after the issue.',
      },
      page: {
        type: 'integer',
        description: 'Page number of results to retrieve.',
        default: 1,
      },
      per_page: {
        type: 'integer',
        description: 'Number of items to list per page.',
        default: 20,
      },
    },
    required: ['id', 'epic_iid', 'epic_issue_id'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/(-/)epics/{epic_iid}/issues/{epic_issue_id}',
    body: ['move_before_id', 'move_after_id', 'page', 'per_page'],
  },
});
