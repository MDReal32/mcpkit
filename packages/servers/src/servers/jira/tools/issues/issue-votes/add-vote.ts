import { defineTool } from '@usemcpkit/core';

export const issuesIssueVotesAddVote = defineTool({
  name: 'issues:issue_votes:add_vote',
  description:
    "Add vote. Adds the user's vote to an issue. This is the equivalent of the user clicking *Vote* on an issue in Jira.",
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/{issueIdOrKey}/votes',
  },
});
