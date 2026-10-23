import { defineTool } from '@usemcpkit/core';

export const activityListPublicEvents = defineTool({
  name: 'activity:list_public_events',
  description:
    'List public events. > [!NOTE] > This API is not built to serve real-time use cases. Depending on the time of day, event latency can be anywhere from 30s to 6h.',
  input: {
    type: 'object',
    properties: {
      per_page: {
        type: 'integer',
        default: 15,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/events',
    query: ['per_page', 'page'],
  },
});
