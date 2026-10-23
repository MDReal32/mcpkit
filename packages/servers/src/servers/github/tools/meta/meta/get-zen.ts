import { defineTool } from '@usemcpkit/core';

export const metaMetaGetZen = defineTool({
  name: 'meta:meta:get_zen',
  description: 'Get the Zen of GitHub. Get a random sentence from the Zen of GitHub',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/zen',
  },
});
