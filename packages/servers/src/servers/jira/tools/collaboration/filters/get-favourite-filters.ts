import { defineTool } from '@usemcpkit/core';

export const collaborationFiltersGetFavouriteFilters = defineTool({
  name: 'collaboration:filters:get_favourite_filters',
  description: 'Get favorite filters. Returns the visible favorite filters of the user.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/filter/favourite',
    query: ['expand'],
  },
});
