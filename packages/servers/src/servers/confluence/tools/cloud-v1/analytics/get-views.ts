import { defineTool } from '@usemcpkit/core';

export const cloudV1AnalyticsGetViews = defineTool({
  name: 'cloud_v1:analytics:get_views',
  description: '[Cloud v1] Get views. Get the total number of views a piece of content has.',
  input: {
    type: 'object',
    properties: {
      contentId: {
        type: 'string',
        description: 'The ID of the content to get the views for.',
      },
      fromDate: {
        type: 'string',
        description: 'The number of views for the content since the date.',
      },
    },
    required: ['contentId'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/analytics/content/{contentId}/views',
    query: ['fromDate'],
  },
});
