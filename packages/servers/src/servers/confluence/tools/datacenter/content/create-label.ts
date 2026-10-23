import { defineTool } from '@usemcpkit/core';

export const datacenterContentCreateLabel = defineTool({
  name: 'datacenter:content:create_label',
  description:
    '[Data Center] Add Labels. Adds a list of labels to the specified content. The body is the json representation of the list.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      prefix: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      body_id: {
        type: 'string',
      },
      label: {
        type: 'string',
      },
      _links: {
        type: 'object',
        properties: {
          base: {
            type: 'string',
          },
          context: {
            type: 'string',
          },
          self: {
            type: 'string',
          },
        },
      },
      _expandable: {
        type: 'object',
        properties: {
          attribute: {
            type: 'string',
          },
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/content/{id}/label',
    body: {
      prefix: 'prefix',
      name: 'name',
      id: 'body_id',
      label: 'label',
      _links: '_links',
      _expandable: '_expandable',
    },
  },
});
