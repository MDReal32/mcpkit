import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsIssuesMove = defineTool({
  name: 'projects:projects:create_projects_issues_move',
  description:
    'Move an issue. Moves a specified issue to a different project. If the target project is the source project or the user has insufficient permissions, an error message with status code `400` is returned. If a label or milestone with the same name also exists in the target project, it is then assigned to the issue being moved.',
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
      to_project_id: {
        type: 'integer',
        description: 'ID of the new project.',
      },
    },
    required: ['id', 'issue_iid', 'to_project_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/issues/{issue_iid}/move',
    body: ['to_project_id'],
  },
});
