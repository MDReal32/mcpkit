import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetProjectsIssuesLinks = defineTool({
  name: 'issues:issues:get_projects_issues_links',
  description: 'Retrieve an issue link. Retrieves a specified issue link.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'Internal ID of the issue.',
      },
      issue_link_id: {
        type: 'string',
        description: 'ID of the issue relationship.',
      },
    },
    required: ['id', 'issue_iid', 'issue_link_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{issue_iid}/links/{issue_link_id}',
  },
});
