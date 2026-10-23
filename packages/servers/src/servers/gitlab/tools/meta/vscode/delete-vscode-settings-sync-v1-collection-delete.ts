import { defineTool } from '@usemcpkit/core';

export const metaVscodeDeleteVscodeSettingsSyncV1CollectionDelete = defineTool({
  name: 'meta:vscode:delete_vscode_settings_sync_v1_collection_delete',
  description:
    'Delete all VS Code setting resources for a user. Deletes all VS Code setting resources of the current user.',
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
    method: 'DELETE',
    path: '/vscode/settings_sync/{settings_context_hash}/v1/collection',
  },
});
