import { defineTool } from '@usemcpkit/core';

export const issuesIssuesDeleteMilestone = defineTool({
  name: 'issues:issues:delete_milestone',
  description: 'Delete a milestone. Deletes a milestone using the given milestone number.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      milestone_number: {
        type: 'integer',
        description: 'The number that identifies the milestone.',
      },
    },
    required: ['owner', 'repo', 'milestone_number'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/milestones/{milestone_number}',
  },
});
