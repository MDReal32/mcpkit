import { defineTool } from '@usemcpkit/core';

export const metaVscodeGetVscodeSettingsSyncV1Resource = defineTool({
  name: 'meta:vscode:get_vscode_settings_sync_v1_resource',
  description:
    'Retrieve a specific setting resource. Retrieves a single VS Code setting resource. Returns 204 when the resource does not exist.',
  input: {
    type: 'object',
    properties: {
      resource_name: {
        type: 'string',
        enum: ['settings', 'extensions', 'globalState', 'machines', 'keybindings', 'snippets', 'tasks', 'profiles'],
        description: 'Name of the resource such as settings.',
      },
      id: {
        type: 'string',
        description: 'ID of the resource to retrieve.',
      },
    },
    required: ['resource_name', 'id'],
  },
  request: {
    method: 'GET',
    path: '/vscode/settings_sync/v1/resource/{resource_name}/{id}',
  },
});
