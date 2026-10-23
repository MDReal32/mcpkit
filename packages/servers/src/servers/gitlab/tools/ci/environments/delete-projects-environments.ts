import { defineTool } from '@usemcpkit/core';

export const ciEnvironmentsDeleteProjectsEnvironments = defineTool({
  name: 'ci:environments:delete_projects_environments',
  description: 'Delete an environment. Deletes an environment from a project. The environment must be stopped first.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      environment_id: {
        type: 'integer',
        description: 'ID of the environment.',
      },
    },
    required: ['id', 'environment_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/environments/{environment_id}',
  },
});
