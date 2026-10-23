import { defineTool } from '@usemcpkit/core';

export const activityGetFeeds = defineTool({
  name: 'activity:get_feeds',
  description:
    'Get feeds. Lists the feeds available to the authenticated user. The response provides a URL for each feed. You can then get a specific feed by sending a request to one of the feed URLs.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/feeds',
  },
});
