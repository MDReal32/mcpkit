import { defineTool } from '@usemcpkit/core';

export const issuesIssueCommentsGetComment = defineTool({
  name: 'issues:issue_comments:get_comment',
  description: 'Get comment. Returns a comment.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      id: {
        type: 'string',
        description: 'The ID of the comment.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML.',
      },
    },
    required: ['issueIdOrKey', 'id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/comment/{id}',
    query: ['expand'],
  },
});
