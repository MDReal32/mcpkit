import { defineTool } from '@usemcpkit/core';

export const usersAvatarsDeleteAvatar = defineTool({
  name: 'users:avatars:delete_avatar',
  description: 'Delete avatar. Deletes an avatar from a project, issue type or priority.',
  input: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['project', 'issuetype', 'priority'],
        description: 'The avatar type.',
      },
      owningObjectId: {
        type: 'string',
        description: 'The ID of the item the avatar is associated with.',
      },
      id: {
        type: 'integer',
        description: 'The ID of the avatar.',
      },
    },
    required: ['type', 'owningObjectId', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{id}',
  },
});
