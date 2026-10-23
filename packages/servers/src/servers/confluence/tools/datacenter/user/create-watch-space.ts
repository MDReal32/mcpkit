import { defineTool } from '@usemcpkit/core';

export const datacenterUserCreateWatchSpace = defineTool({
  name: 'datacenter:user:create_watch_space',
  description:
    '[Data Center] Add space watcher. Create a new watcher for the given user and space key. User is optional. If not specified, currently logged-in user will be used. Otherwise, it can be specified by either user key or username. When a user is specified and is different from the logged-in user, the logged-in user needs to be a Confluence administrator.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
      },
      contentType: {
        type: 'string',
        description: 'the optional content type to delete the watcher for. (comma-separated)',
      },
      key: {
        type: 'object',
        properties: {
          userKey: {
            type: 'string',
          },
        },
        description: 'userKey of the user to create the new watcher for.',
      },
      username: {
        type: 'string',
        description: 'userName of the user to create the new watcher for.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/user/watch/space/{spaceKey}',
    query: ['contentType', 'key', 'username'],
  },
});
