import { defineTool } from '@usemcpkit/core';

export const ciRunnersCreateGroupsRunnersResetRegistrationToken = defineTool({
  name: 'ci:runners:create_groups_runners_reset_registration_token',
  description:
    'Reset the runner registration token for a group. Resets the runner registration token for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/runners/reset_registration_token',
  },
});
