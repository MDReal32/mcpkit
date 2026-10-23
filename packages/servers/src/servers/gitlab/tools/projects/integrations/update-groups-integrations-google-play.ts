import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsUpdateGroupsIntegrationsGooglePlay = defineTool({
  name: 'projects:integrations:update_groups_integrations_google_play',
  description: 'Create or update the Google Play integration. Creates or updates the Google Play integration.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      package_name: {
        type: 'string',
        description: 'Package name of the app in Google Play.',
      },
      service_account_key_file_name: {
        type: 'string',
        description: 'File name of the Google Play service account key.',
      },
      service_account_key: {
        type: 'string',
        description: 'Google Play service account key.',
      },
      google_play_protected_refs: {
        type: 'boolean',
        description: 'Set variables on protected branches and tags only.',
      },
      use_inherited_settings: {
        type: 'boolean',
        description: 'Indicates whether to inherit the default settings. Defaults to `false`.',
      },
    },
    required: ['id', 'package_name', 'service_account_key_file_name', 'service_account_key'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/integrations/google-play',
    body: [
      'package_name',
      'service_account_key_file_name',
      'service_account_key',
      'google_play_protected_refs',
      'use_inherited_settings',
    ],
  },
});
