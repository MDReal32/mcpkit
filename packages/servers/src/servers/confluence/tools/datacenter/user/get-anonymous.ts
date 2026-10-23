import { defineTool } from '@usemcpkit/core';

export const datacenterUserGetAnonymous = defineTool({
  name: 'datacenter:user:get_anonymous',
  description:
    '[Data Center] Get information about anonymous user type. Get information about how anonymous is represented in Confluence. Example request URI(s):',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description: 'properties to expand on the user.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/user/anonymous',
    query: ['expand'],
  },
});
