import { defineTool } from '@usemcpkit/core';

export const cloudWhiteboardsGetWhiteboardAncestors = defineTool({
  name: 'cloud:whiteboards:get_whiteboard_ancestors',
  description:
    '[Cloud] Get all ancestors of whiteboard. Returns all ancestors for a given whiteboard by ID in top-to-bottom order (that is, the highest ancestor is the first item in the response payload). The number of results is limited by the `limit` parameter and additional results (if available) will be available by calling this endpoint with the ID of first ancestor in the response payload.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the whiteboard.',
      },
      limit: {
        type: 'integer',
        description:
          "Maximum number of items per result to return. If more results exist, call the endpoint with the highest ancestor's ID to fetch the next set of results.",
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/whiteboards/{id}/ancestors',
    query: ['limit'],
  },
});
