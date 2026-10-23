import { defineTool } from '@usemcpkit/core';

export const metaLicensesGet = defineTool({
  name: 'meta:licenses:get',
  description:
    'Get a license. Gets information about a specific license. For more information, see "Licensing a repository ."',
  input: {
    type: 'object',
    properties: {
      license: {
        type: 'string',
      },
    },
    required: ['license'],
  },
  request: {
    method: 'GET',
    path: '/licenses/{license}',
  },
});
