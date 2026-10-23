import { defineTool } from '@usemcpkit/core';

export const projectsProjectsGetProjectsIssues = defineTool({
  name: 'projects:projects:get_projects_issues',
  description:
    'Retrieve a project issue. Retrieves a specified issue for a project. If the project is private or the issue is confidential, you need to provide credentials to authorize. In most cases, you should authenticate with a personal access token.',
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
    path: '/projects/{id}/issues/{issue_iid}',
  },
});
