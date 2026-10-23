import { defineTool } from '@usemcpkit/core';

export const metaVscodeListVscodeSettingsSyncV1Resource = defineTool({
  name: 'meta:vscode:list_vscode_settings_sync_v1_resource',
  description:
    'List all references to a VS Code setting resource. Lists all references to the stored versions of a VS Code setting resource.',
  input: {
    type: 'object',
    properties: {
      resource_name: {
        type: 'string',
        enum: ['settings', 'extensions', 'globalState', 'machines', 'keybindings', 'snippets', 'tasks', 'profiles'],
        description: 'Name of the resource such as settings.',
      },
    },
    required: ['resource_name'],
  },
  request: {
    method: 'GET',
    path: '/vscode/settings_sync/v1/resource/{resource_name}',
  },
});
