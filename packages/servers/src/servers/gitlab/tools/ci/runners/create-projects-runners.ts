import { defineTool } from '@usemcpkit/core';

export const ciRunnersCreateProjectsRunners = defineTool({
  name: 'ci:runners:create_projects_runners',
  description: 'Assign a runner to a project. Assigns an available project runner to a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      runner_id: {
        type: 'integer',
        description: 'ID of the runner.',
      },
    },
    required: ['id', 'runner_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/runners',
    body: ['runner_id'],
  },
});
