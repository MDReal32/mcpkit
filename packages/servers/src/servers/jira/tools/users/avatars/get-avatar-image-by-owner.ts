import { defineTool } from '@usemcpkit/core';

export const usersAvatarsGetAvatarImageByOwner = defineTool({
  name: 'users:avatars:get_avatar_image_by_owner',
  description: 'Get avatar image by owner. Returns the avatar image for a project, issue type or priority.',
  input: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['issuetype', 'project', 'priority'],
        description: 'The icon type of the avatar.',
      },
      entityId: {
        type: 'string',
        description: 'The ID of the project or issue type the avatar belongs to.',
      },
      size: {
        type: 'string',
        enum: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
        description: 'The size of the avatar image. If not provided the default size is returned.',
      },
      format: {
        type: 'string',
        enum: ['png', 'svg'],
        description:
          'The format to return the avatar image in. If not provided the original content format is returned.',
      },
    },
    required: ['type', 'entityId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/universal_avatar/view/type/{type}/owner/{entityId}',
    query: ['size', 'format'],
  },
});
