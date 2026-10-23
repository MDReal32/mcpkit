import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProjectsIssues = defineTool({
  name: 'projects:projects:delete_projects_issues',
  description: 'Delete an issue. Deletes a specified issue.',
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
    method: 'DELETE',
    path: '/projects/{id}/issues/{issue_iid}',
  },
});
