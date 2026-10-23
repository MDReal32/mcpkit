import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetProjectsIssuesUserAgentDetail = defineTool({
  name: 'issues:issues:get_projects_issues_user_agent_detail',
  description: 'Retrieve user agent details for an issue. Retrieves user agent details for an issue.',
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
    path: '/projects/{id}/issues/{issue_iid}/user_agent_detail',
  },
});
