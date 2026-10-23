import { defineTool } from '@usemcpkit/core';

export const issuesIssuesArchiveIssues = defineTool({
  name: 'issues:issues:archive_issues',
  description:
    'Archive issue(s) by issue ID/key. Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) archived in the process and the errors encountered, if any.',
  input: {
    type: 'object',
    properties: {
      issueIdsOrKeys: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issue/archive',
    body: ['issueIdsOrKeys'],
  },
});
