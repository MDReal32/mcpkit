import { defineTool } from '@usemcpkit/core';

export const collaborationFiltersDeleteFavouriteForFilter = defineTool({
  name: 'collaboration:filters:delete_favourite_for_filter',
  description:
    "Remove filter as favorite. Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the filter.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/filter/{id}/favourite',
    query: ['expand'],
  },
});
