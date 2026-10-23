import { defineTool } from '@usemcpkit/core';

export const groupsGroupsDeleteGroupsUploadsDelete = defineTool({
  name: 'groups:groups:delete_groups_uploads_delete',
  description:
    'Delete an uploaded file by secret and filename. Deletes an uploaded file with a specified secret and filename. You must have the Maintainer or Owner role for the group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      secret: {
        type: 'string',
        description: 'Secret of the upload.',
      },
      filename: {
        type: 'string',
        description: 'Filename of the upload.',
      },
    },
    required: ['id', 'secret', 'filename'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/uploads/{secret}/{filename}',
  },
});
