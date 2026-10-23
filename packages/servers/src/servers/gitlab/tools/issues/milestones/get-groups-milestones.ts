import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesGetGroupsMilestones = defineTool({
  name: 'issues:milestones:get_groups_milestones',
  description: 'Retrieve a group milestone. Retrieves a specified group milestone.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      milestone_id: {
        type: 'integer',
        description: 'ID of the group milestone.',
      },
    },
    required: ['id', 'milestone_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/milestones/{milestone_id}',
  },
});
