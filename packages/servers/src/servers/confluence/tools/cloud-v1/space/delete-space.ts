import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceDeleteSpace = defineTool({
  name: 'cloud_v1:space:delete_space',
  description:
    '[Cloud v1] Delete space. Permanently deletes a space without sending it to the trash. Note, the space will be deleted in a long running task. Therefore, the space may not be deleted yet when this method has returned. Clients should poll the status link that is returned in the response until the task completes.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to delete.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/space/{spaceKey}',
  },
});
