import { defineTool } from '@usemcpkit/core';

export const softwareIssueEstimateIssueForBoard = defineTool({
  name: 'software:issue:estimate_issue_for_board',
  description:
    'Estimate issue for board. Updates the estimation of the issue. boardId param is required. This param determines which field will be updated on a issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the requested issue.',
      },
      boardId: {
        type: 'integer',
        description: 'The ID of the board required to determine which field is used for estimation.',
      },
      value: {
        type: 'string',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/agile/1.0/issue/{issueIdOrKey}/estimation',
    query: ['boardId'],
    body: ['value'],
  },
});
