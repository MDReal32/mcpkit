import { defineTool } from '@usemcpkit/core';

export const rateLimitGet = defineTool({
  name: 'rate_limit:get',
  description:
    'Get rate limit status for the authenticated user. > [!NOTE] > Accessing this endpoint does not count against your REST API rate limit.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rate_limit',
  },
});
