import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetRestrictionRelevantViewRestrictions = defineTool({
  name: 'datacenter:content:get_restriction_relevant_view_restrictions',
  description:
    '[Data Center] Get all view restriction both direct and inherited. Returns relevant view restriction both direct and inherited for a single content.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description:
          'A comma separated list of properties to expand on the content properties. Default value: relevantViewRestrictions',
      },
      limit: {
        type: 'integer',
        description: 'pagination limit, Max 50 per page',
      },
      start: {
        type: 'integer',
        description: 'pagination start.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/restriction/relevantViewRestrictions',
    query: ['expand', 'limit', 'start'],
  },
});
