import { defineTool } from '@usemcpkit/core';

export const adminBroadcastMessagesListBroadcastMessages = defineTool({
  name: 'admin:broadcast_messages:list_broadcast_messages',
  description: 'List all broadcast messages. Lists all broadcast messages for the instance.',
  input: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/broadcast_messages',
    query: ['page', 'per_page'],
  },
});
