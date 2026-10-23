import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentAddRestrictions = defineTool({
  name: 'cloud_v1:content:add_restrictions',
  description:
    '[Cloud v1] Add restrictions. Adds restrictions to a piece of content. Note, this does not change any existing restrictions on the content.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content to add restrictions to.',
      },
      expand: {
        type: 'string',
        description:
          'A multi-value parameter indicating which properties of the content restrictions (returned in response) to expand. (comma-separated)',
      },
      results: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
      start: {
        type: 'integer',
      },
      limit: {
        type: 'integer',
      },
      size: {
        type: 'integer',
      },
      restrictionsHash: {
        type: 'string',
        description: 'This property is used by the UI to figure out whether a set of restrictions has changed.',
      },
      _links: {
        type: 'object',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/content/{id}/restriction',
    query: ['expand'],
    body: ['results', 'start', 'limit', 'size', 'restrictionsHash', '_links'],
  },
});
