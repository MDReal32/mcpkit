import { defineTool } from '@usemcpkit/core';

export const projectsProjectsDeleteProject = defineTool({
  name: 'projects:projects:delete_project',
  description: 'Delete project. Deletes a project.',
  input: {
    type: 'object',
    properties: {
      projectIdOrKey: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      enableUndo: {
        type: 'boolean',
        default: true,
        description:
          'Whether this project is placed in the Jira recycle bin where it will be available for restoration.',
      },
    },
    required: ['projectIdOrKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/project/{projectIdOrKey}',
    query: ['enableUndo'],
  },
});
