import { defineTool } from '@usemcpkit/core';

export const issuesIssuesCreateProjectsIssuesTimeEstimate = defineTool({
  name: 'issues:issues:create_projects_issues_time_estimate',
  description: 'Set the estimated time for an issue. Sets an estimated time of work for a specified issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'The internal ID of the issue.',
      },
      duration: {
        type: 'string',
        description: 'Duration in human-readable format, for example `3h30m`.',
      },
    },
    required: ['id', 'issue_iid', 'duration'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/issues/{issue_iid}/time_estimate',
    body: ['duration'],
  },
});
