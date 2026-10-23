import { defineTool } from '@usemcpkit/core';

export const issuesProjectApprovalsGetProjectsApprovals = defineTool({
  name: 'issues:project_approvals:get_projects_approvals',
  description: 'Retrieve approval configuration for a project. Retrieves the approval configuration for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/approvals',
  },
});
