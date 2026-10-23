import { defineTool } from '@usemcpkit/core';

export const ciRunnersCreateProjectsRunnersResetRegistrationToken = defineTool({
  name: 'ci:runners:create_projects_runners_reset_registration_token',
  description:
    'Reset the runner registration token for a project. Resets the runner registration token for a specified project.',
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
    method: 'POST',
    path: '/projects/{id}/runners/reset_registration_token',
  },
});
