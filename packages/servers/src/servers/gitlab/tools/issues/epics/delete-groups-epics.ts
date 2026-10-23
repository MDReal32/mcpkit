import { defineTool } from '@usemcpkit/core';

export const issuesEpicsDeleteGroupsEpics = defineTool({
  name: 'issues:epics:delete_groups_epics',
  description: 'Destroy an epic. Deletes an epic',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
    },
    required: ['id', 'epic_iid'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/(-/)epics/{epic_iid}',
  },
});
