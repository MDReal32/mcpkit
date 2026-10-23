import { defineTool } from '@usemcpkit/core';

export const datacenterUserGetWatchContent = defineTool({
  name: 'datacenter:user:get_watch_content',
  description:
    '[Data Center] Get information about content watcher. Get information about whether a user is watching a specified content. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator.',
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
    method: 'GET',
    path: '/rest/api/user/watch/content/{contentId}',
    query: ['key', 'username'],
  },
});
