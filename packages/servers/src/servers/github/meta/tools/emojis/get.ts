import { defineTool } from '@usemcpkit/core';

export const emojisGet = defineTool({
  name: 'emojis:get',
  description: 'Get emojis. Lists all the emojis available to use on GitHub.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/emojis',
  },
});
