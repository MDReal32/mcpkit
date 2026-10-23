import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesListGroupsMilestonesIssues = defineTool({
  name: 'issues:milestones:list_groups_milestones_issues',
  description:
    'List all issues assigned to a single milestone. Lists all issues assigned to a specified group milestone.',
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
    required: ['id', 'milestone_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/milestones/{milestone_id}/issues',
    query: ['page', 'per_page'],
  },
});
