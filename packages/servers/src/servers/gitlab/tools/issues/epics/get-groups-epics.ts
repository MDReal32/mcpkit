import { defineTool } from '@usemcpkit/core';

export const issuesEpicsGetGroupsEpics = defineTool({
  name: 'issues:epics:get_groups_epics',
  description: 'Get details of an epic. Gets a single epic',
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
    method: 'GET',
    path: '/groups/{id}/epics/{epic_iid}',
  },
});
