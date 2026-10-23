import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceGetContentStateSettings = defineTool({
  name: 'cloud_v1:space:get_content_state_settings',
  description:
    '[Cloud v1] Get content state settings for space. Get object describing whether content states are allowed at all, if custom content states or space content states are restricted, and a list of space content states allowed for the space if they are not restricted.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to be queried for its content state settings.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/space/{spaceKey}/state/settings',
  },
});
