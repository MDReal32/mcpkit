import { defineTool } from '@usemcpkit/core';

export const ciEnvironmentsCreateProjectsEnvironmentsStop = defineTool({
  name: 'ci:environments:create_projects_environments_stop',
  description: 'Stop an environment. Stops a specified running environment.',
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
      force: {
        type: 'boolean',
        description: 'If `true`, stops the environment without executing `on_stop` actions.',
        default: false,
      },
    },
    required: ['id', 'environment_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/environments/{environment_id}/stop',
    body: ['force'],
  },
});
