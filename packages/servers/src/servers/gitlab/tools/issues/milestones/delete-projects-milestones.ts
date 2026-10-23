import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesDeleteProjectsMilestones = defineTool({
  name: 'issues:milestones:delete_projects_milestones',
  description:
    'Delete a project milestone. Deletes a specified project milestone. Only for users with the Planner, Reporter, Developer, Maintainer, or Owner role for the project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      milestone_id: {
        type: 'integer',
        description: 'ID of the project milestone.',
      },
    },
    required: ['id', 'milestone_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/milestones/{milestone_id}',
  },
});
