import { defineTool } from '@usemcpkit/core';

export const issuesEpicsUpdateGroupsEpicsEpics = defineTool({
  name: 'issues:epics:update_groups_epics_epics',
  description: 'Reorder child epics. Reorders a child epic.',
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
      child_epic_id: {
        type: 'integer',
        description:
          "Global ID of the child epic. The internal ID can't be used because internal IDs can conflict with epics from other groups.",
      },
      move_before_id: {
        type: 'integer',
        description: 'ID of the epic to position before the child epic.',
      },
      move_after_id: {
        type: 'integer',
        description: 'ID of the epic to position after the child epic.',
      },
    },
    required: ['id', 'epic_iid', 'child_epic_id'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/(-/)epics/{epic_iid}/epics/{child_epic_id}',
    body: ['move_before_id', 'move_after_id'],
  },
});
