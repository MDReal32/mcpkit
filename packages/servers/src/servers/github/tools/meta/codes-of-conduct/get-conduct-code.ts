import { defineTool } from '@usemcpkit/core';

export const metaCodesOfConductGetConductCode = defineTool({
  name: 'meta:codes_of_conduct:get_conduct_code',
  description: 'Get a code of conduct. Returns information about the specified GitHub code of conduct.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
    },
    required: ['key'],
  },
  request: {
    method: 'GET',
    path: '/codes_of_conduct/{key}',
  },
});
