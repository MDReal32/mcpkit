import { defineTool } from '@usemcpkit/core';

export const metaVscodeGetVscodeSettingsSyncV1ResourceGet = defineTool({
  name: 'meta:vscode:get_vscode_settings_sync_v1_resource_get',
  description:
    'Retrieve a specific setting resource. Retrieves a single VS Code setting resource. Returns 204 when the resource does not exist.',
  input: {
    type: 'object',
    properties: {
      settings_context_hash: {
        type: 'string',
        description: 'Settings context hash.',
      },
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
    required: ['settings_context_hash', 'resource_name', 'id'],
  },
  request: {
    method: 'GET',
    path: '/vscode/settings_sync/{settings_context_hash}/v1/resource/{resource_name}/{id}',
  },
});
