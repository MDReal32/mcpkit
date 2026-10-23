import { defineTool } from '@usemcpkit/core';

export const adminBroadcastMessagesCreateBroadcastMessages = defineTool({
  name: 'admin:broadcast_messages:create_broadcast_messages',
  description: 'Create a broadcast message. Creates a broadcast message.',
  input: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Message to display.',
      },
      starts_at: {
        type: 'string',
        description: 'Starting time, in UTC. When creating a message, defaults to the current time.',
      },
      ends_at: {
        type: 'string',
        description: 'Ending time, in UTC. When creating a message, defaults to one hour after the current time.',
      },
      color: {
        type: 'string',
        description: 'Background color hex code. Deprecated. Use `theme` instead.',
      },
      font: {
        type: 'string',
        description: 'Foreground color hex code. Deprecated. Use `theme` instead.',
      },
      target_access_levels: {
        type: 'array',
        description: 'Target access levels (roles) of the broadcast message.',
        items: {
          type: 'integer',
          enum: [10, 15, 20, 30, 40, 50],
        },
      },
      target_path: {
        type: 'string',
        description: 'Target path of the broadcast message.',
      },
      broadcast_type: {
        type: 'string',
        description: 'Appearance type of the broadcast message.',
        default: 'banner',
        enum: ['banner', 'notification'],
      },
      dismissable: {
        type: 'boolean',
        description: 'If `true`, the user can dismiss the message.',
      },
      theme: {
        type: 'string',
        description: 'Color theme for the broadcast message. Applies only to banners.',
        enum: [
          'indigo',
          'light-indigo',
          'blue',
          'light-blue',
          'green',
          'light-green',
          'red',
          'light-red',
          'dark',
          'light',
        ],
      },
    },
    required: ['message'],
  },
  request: {
    method: 'POST',
    path: '/broadcast_messages',
    body: [
      'message',
      'starts_at',
      'ends_at',
      'color',
      'font',
      'target_access_levels',
      'target_path',
      'broadcast_type',
      'dismissable',
      'theme',
    ],
  },
});
