import { defineTool } from '@usemcpkit/core';

export const issuesIssuesListProjectsIssuesLinks = defineTool({
  name: 'issues:issues:list_projects_issues_links',
  description:
    'List all issue links. Lists all linked issues for a specified issue, sorted by the relationship creation datetime (ascending). Issues are filtered according to the user authorizations.',
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
    },
    required: ['id', 'issue_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{issue_iid}/links',
  },
});
