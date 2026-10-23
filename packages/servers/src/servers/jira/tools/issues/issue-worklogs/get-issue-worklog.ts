import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogsGetIssueWorklog = defineTool({
  name: 'issues:issue_worklogs:get_issue_worklog',
  description:
    'Get issue worklogs. Returns worklogs for an issue (ordered by created time), starting from the oldest worklog or from the worklog started on or after a date and time.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 5000,
        description: 'The maximum number of items to return per page.',
      },
      startedAfter: {
        type: 'integer',
        description:
          'The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned.',
      },
      startedBefore: {
        type: 'integer',
        description:
          'The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned.',
      },
      expand: {
        type: 'string',
        default: '',
        description:
          'Use expand to include additional information about worklogs in the response. This parameter accepts`properties`, which returns worklog properties.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/worklog',
    query: ['startAt', 'maxResults', 'startedAfter', 'startedBefore', 'expand'],
  },
});
