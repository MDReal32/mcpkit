import { defineTool } from '@usemcpkit/core';

export const issuesEpicsCreateGroupsEpicsRelatedEpics = defineTool({
  name: 'issues:epics:create_groups_epics_related_epics',
  description:
    'Create a related epic link. Creates a two-way relation between two epics. The user must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role for both groups.',
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
      target_group_id: {
        type: 'string',
        description: 'ID or URL-encoded path of the target group.',
      },
      target_epic_iid: {
        type: 'integer',
        description: "Internal ID of the target group's epic.",
      },
      link_type: {
        type: 'string',
        description: 'Type of the relation. Defaults to `relates_to`.',
        enum: ['relates_to', 'blocks', 'is_blocked_by'],
      },
    },
    required: ['id', 'epic_iid', 'target_group_id', 'target_epic_iid'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/epics/{epic_iid}/related_epics',
    body: ['target_group_id', 'target_epic_iid', 'link_type'],
  },
});
