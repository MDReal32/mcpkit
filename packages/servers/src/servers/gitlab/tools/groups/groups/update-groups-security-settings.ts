import { defineTool } from '@usemcpkit/core';

export const groupsGroupsUpdateGroupsSecuritySettings = defineTool({
  name: 'groups:groups:update_groups_security_settings',
  description:
    'Update group security settings. Updates group security settings for a specified group. You must have the Security Manager, Maintainer, or Owner role for the group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      secret_push_protection_enabled: {
        type: 'boolean',
        description: 'If `true`, enables secret push protection for projects in the group.',
      },
      projects_to_exclude: {
        type: 'array',
        description: 'IDs of projects to exclude from secret push protection.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['id', 'secret_push_protection_enabled'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/security_settings',
    body: ['secret_push_protection_enabled', 'projects_to_exclude'],
  },
});
