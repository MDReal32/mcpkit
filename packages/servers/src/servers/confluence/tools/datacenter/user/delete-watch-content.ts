import { defineTool } from '@usemcpkit/core';

export const datacenterUserDeleteWatchContent = defineTool({
  name: 'datacenter:user:delete_watch_content',
  description:
    '[Data Center] Remove content watcher. Delete an existing watcher for the given user and content id. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator.',
  input: {
    type: 'object',
    properties: {
      contentId: {
        type: 'string',
        description: 'id of the content.',
      },
      key: {
        type: 'object',
        properties: {
          userKey: {
            type: 'string',
          },
        },
        description: 'userkey of the user to check for watching state.',
      },
      username: {
        type: 'string',
        description: 'username of the user to check for watching state.',
      },
    },
    required: ['contentId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/user/watch/content/{contentId}',
    query: ['key', 'username'],
  },
});
