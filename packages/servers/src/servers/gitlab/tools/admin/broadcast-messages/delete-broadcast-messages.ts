import { defineTool } from '@usemcpkit/core';

export const adminBroadcastMessagesDeleteBroadcastMessages = defineTool({
  name: 'admin:broadcast_messages:delete_broadcast_messages',
  description: 'Delete a broadcast message. Deletes a specified broadcast message.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the broadcast message.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/broadcast_messages/{id}',
  },
});
