import { defineTool } from '@usemcpkit/core';

export const cloudV1UserAddContentWatcher = defineTool({
  name: 'cloud_v1:user:add_content_watcher',
  description:
    '[Cloud v1] Add content watcher. Adds a user as a watcher to a piece of content. Choose the user by doing one of the following:',
  input: {
    type: 'object',
    properties: {
      contentId: {
        type: 'string',
        description: 'The ID of the content to add the watcher to.',
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
    required: ['contentId'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/user/watch/content/{contentId}',
    query: ['key', 'username', 'accountId'],
  },
});
