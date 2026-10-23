import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceDeleteTrash = defineTool({
  name: 'datacenter:space:delete_trash',
  description:
    '[Data Center] Remove all trash contents. Remove all content from the trash in the given space, deleting them permanently.Example request URI:',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the key of the space to update.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/space/{spaceKey}/trash',
  },
});
