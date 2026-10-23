import { defineTool } from '@usemcpkit/core';

export const metaVscodeCreateVscodeSettingsSyncV1Resource = defineTool({
  name: 'meta:vscode:create_vscode_settings_sync_v1_resource',
  description:
    'Create or update a specific setting. Creates a VS Code setting resource, or updates it if it already exists.',
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
    method: 'POST',
    path: '/vscode/settings_sync/v1/resource/{resource_name}',
  },
});
