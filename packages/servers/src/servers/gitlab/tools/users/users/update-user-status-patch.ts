import { defineTool } from '@usemcpkit/core';

export const usersUsersUpdateUserStatusPatch = defineTool({
  name: 'users:users:update_user_status_patch',
  description:
    'Update a user status. Sets the status of the currently authenticated user. Any parameters that are not passed are ignored. This operation is similar but distinct from the Set a user status operation.',
  input: {
    type: 'object',
    properties: {
      emoji: {
        type: 'string',
        description:
          'Name of the emoji to use as a status. If omitted, `speech_balloon` is used. Must be one of the names in the Gemojione index.',
      },
      message: {
        type: 'string',
        description: 'Message to set as a status. Can contain emoji codes. Maximum of 100 characters.',
      },
      availability: {
        type: 'string',
        description: 'Availability of the user. Possible values are `busy` and `not_set`.',
      },
      clear_status_after: {
        type: 'string',
        description: 'Time after which the status is cleared automatically.',
        enum: ['30_minutes', '3_hours', '8_hours', '1_day', '3_days', '7_days', '30_days'],
      },
    },
  },
  request: {
    method: 'PATCH',
    path: '/user/status',
    body: ['emoji', 'message', 'availability', 'clear_status_after'],
  },
});
