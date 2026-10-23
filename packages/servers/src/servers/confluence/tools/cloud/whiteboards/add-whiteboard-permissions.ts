import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsAddWhiteboardPermissions = defineTool({
  name: 'cloud:whiteboards:add_whiteboard_permissions',
  description:
    '[Cloud] Add whiteboard permissions. Adds or replaces direct content permissions for the specified principals on a whiteboard. Permissions for other principals are preserved; use `PUT` to replace all permissions at once.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the whiteboard.',
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
    method: 'POST',
    path: '/wiki/api/v2/whiteboards/{id}/permissions',
    query: {
      'allow-self-lockout': 'allow_self_lockout',
    },
    body: ['permissions'],
  },
});
