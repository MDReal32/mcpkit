import { defineTool } from '@usemcpkit/core';

export const metaVscodeDeleteVscodeSettingsSyncV1Collection = defineTool({
  name: 'meta:vscode:delete_vscode_settings_sync_v1_collection',
  description:
    'Delete all VS Code setting resources for a user. Deletes all VS Code setting resources of the current user.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/vscode/settings_sync/v1/collection',
  },
});
