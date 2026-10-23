import { defineTool } from '@usemcpkit/core';

export const metaVscodeGetVscodeSettingsSyncV1ManifestGet = defineTool({
  name: 'meta:vscode:get_vscode_settings_sync_v1_manifest_get',
  description:
    'Retrieve the settings manifest for Settings Sync. Retrieves the manifest of the settings stored for VS Code Settings Sync.',
  input: {
    type: 'object',
    properties: {
      settings_context_hash: {
        type: 'string',
        description: 'Settings context hash.',
      },
    },
    required: ['settings_context_hash'],
  },
  request: {
    method: 'GET',
    path: '/vscode/settings_sync/{settings_context_hash}/v1/manifest',
  },
});
