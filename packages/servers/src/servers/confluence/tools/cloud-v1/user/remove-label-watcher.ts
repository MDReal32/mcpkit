import { defineTool } from '@usemcpkit/core';

export const cloudV1UserRemoveLabelWatcher = defineTool({
  name: 'cloud_v1:user:remove_label_watcher',
  description:
    '[Cloud v1] Remove label watcher. Removes a user as a watcher from a label. Choose the user by doing one of the following:',
  input: {
    type: 'object',
    properties: {
      labelName: {
        type: 'string',
        description: 'The name of the label to remove the watcher from.',
      },
      key: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
      },
      username: {
        type: 'string',
        description:
          'This parameter is no longer available and will be removed from the documentation soon. Use `accountId` instead. See the deprecation notice for details.',
      },
      accountId: {
        type: 'string',
        description:
          'The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.',
      },
    },
    required: ['labelName'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/user/watch/label/{labelName}',
    query: ['key', 'username', 'accountId'],
  },
});
