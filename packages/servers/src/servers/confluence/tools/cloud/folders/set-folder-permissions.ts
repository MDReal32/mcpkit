import { defineTool } from '@usemcpkit/core';

export const cloudFoldersSetFolderPermissions = defineTool({
  name: 'cloud:folders:set_folder_permissions',
  description:
    '[Cloud] Set folder permissions. Replaces all direct content permissions on a folder with the provided set.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the folder.',
      },
      allow_self_lockout: {
        type: 'boolean',
        description:
          "If `false` (default), the request is rejected when it would remove the calling user's own edit access. Set to `true` to allow the operation even when it locks out the caller.",
      },
      permissions: {
        type: 'array',
        items: {
          type: 'object',
          description: 'A set of principals to assign a given operation permission to.',
        },
      },
    },
    required: ['id', 'permissions'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/folders/{id}/permissions',
    query: {
      'allow-self-lockout': 'allow_self_lockout',
    },
    body: ['permissions'],
  },
});
