import { defineTool } from '@usemcpkit/core';

export const issuesEpicsDeleteGroupsEpicsRelatedEpics = defineTool({
  name: 'issues:epics:delete_groups_epics_related_epics',
  description:
    'Delete a related epic link. Deletes a two-way relation between two specified epics. The user must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role for both groups.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      related_epic_link_id: {
        type: 'integer',
        description: 'ID of the related epic link.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
    },
    required: ['id', 'related_epic_link_id', 'epic_iid'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/epics/{epic_iid}/related_epics/{related_epic_link_id}',
  },
});
