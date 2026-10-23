import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsHousekeeping = defineTool({
  name: 'projects:projects:create_projects_housekeeping',
  description: 'Start the housekeeping task for a project. Starts the housekeeping task for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      task: {
        type: 'string',
        description: '`prune` to trigger manual prune of unreachable objects or `eager` to trigger eager housekeeping.',
        default: 'eager',
        enum: ['eager', 'prune'],
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/housekeeping',
    body: ['task'],
  },
});
