import { defineTool } from '@usemcpkit/core';

export const issuesIssueWorklogsGetIdsOfWorklogsDeletedSince = defineTool({
  name: 'issues:issue_worklogs:get_ids_of_worklogs_deleted_since',
  description:
    'Get IDs of deleted worklogs. Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.',
  input: {
    type: 'object',
    properties: {
      since: {
        type: 'integer',
        default: 0,
        description:
          'The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/worklog/deleted',
    query: ['since'],
  },
});
