import { defineTool } from '@usemcpkit/core';

export const securityGroupCredentialsInventoryCreateGroupsManageResourceAccessTokensRotate = defineTool({
  name: 'security:group_credentials_inventory:create_groups_manage_resource_access_tokens_rotate',
  description:
    'Rotate a group or project access token for a group. Rotates a specified group or project access token associated with a top-level group. This revokes the previous token and creates a new token.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      prat_id: {
        type: 'integer',
        description: 'ID of the resource access token.',
      },
      expires_at: {
        type: 'string',
        description:
          'Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise. When expiry is enforced, the date must be no more than one year after rotation.',
      },
    },
    required: ['id', 'prat_id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/manage/resource_access_tokens/{prat_id}/rotate',
    body: ['expires_at'],
  },
});
