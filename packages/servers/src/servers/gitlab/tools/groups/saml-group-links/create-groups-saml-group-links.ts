import { defineTool } from '@usemcpkit/core';

export const groupsSamlGroupLinksCreateGroupsSamlGroupLinks = defineTool({
  name: 'groups:saml_group_links:create_groups_saml_group_links',
  description: 'Add SAML group link. Add a SAML group link for a group',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      saml_group_name: {
        type: 'string',
        description: 'Name of the SAML group.',
      },
      access_level: {
        type: 'integer',
        description: 'Default access level for members of the SAML group.',
        enum: [5, 10, 15, 20, 25, 30, 40, 50],
      },
      member_role_id: {
        type: 'integer',
        description: 'ID of the member role for members of the SAML group.',
      },
      provider: {
        type: 'string',
        description: 'Unique provider name that must match for this group link to be applied.',
      },
    },
    required: ['id', 'saml_group_name', 'access_level'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/saml_group_links',
    body: ['saml_group_name', 'access_level', 'member_role_id', 'provider'],
  },
});
