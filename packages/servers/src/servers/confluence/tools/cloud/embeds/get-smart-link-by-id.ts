import { defineTool } from '@usemcpkit/core';

export const cloudEmbedsGetSmartLinkById = defineTool({
  name: 'cloud:embeds:get_smart_link_by_id',
  description: '[Cloud] Get Smart Link in the content tree by id. Returns a specific Smart Link in the content tree.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the Smart Link in the content tree to be returned.',
      },
      include_collaborators: {
        type: 'boolean',
        description: 'Includes collaborators on the Smart Link.',
      },
      include_direct_children: {
        type: 'boolean',
        description: 'Includes direct children of the Smart Link, as defined in the `ChildrenResponse` object.',
      },
      include_operations: {
        type: 'boolean',
        description:
          'Includes operations associated with this Smart Link in the response, as defined in the `Operation` object. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
      include_properties: {
        type: 'boolean',
        description:
          'Includes content properties associated with this Smart Link in the response. The number of results will be limited to 50 and sorted in the default sort order. A `meta` and `_links` property will be present to indicate if more results are available and a link to retrieve the rest of the results.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/embeds/{id}',
    query: {
      'include-collaborators': 'include_collaborators',
      'include-direct-children': 'include_direct_children',
      'include-operations': 'include_operations',
      'include-properties': 'include_properties',
    },
  },
});
