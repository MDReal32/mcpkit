import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceUpdateProperty = defineTool({
  name: 'datacenter:space:update_property',
  description:
    '[Data Center] Update space property. Updates a space property.The body contains the representation of the space property. Must include new version number.If the given version number is 1, attempts to create a new space property.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the space to find properties under. Required.',
      },
      key: {
        type: 'string',
        description: 'the key of the property',
      },
      body_key: {
        type: 'string',
      },
      value: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
          },
        },
      },
      version: {
        type: 'object',
        properties: {
          by: {
            type: 'object',
          },
          when: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          number: {
            type: 'integer',
          },
          minorEdit: {
            type: 'boolean',
          },
          hidden: {
            type: 'boolean',
          },
          syncRev: {
            type: 'string',
          },
          content: {
            type: 'object',
          },
          contentRef: {
            type: 'object',
          },
        },
      },
      space: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          key: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          icon: {
            type: 'object',
          },
          description: {
            type: 'object',
          },
          homepage: {
            type: 'object',
          },
          links: {
            type: 'object',
          },
          type: {
            type: 'string',
          },
          creator: {
            type: 'object',
          },
          creationDate: {
            type: 'string',
          },
          lastModifier: {
            type: 'object',
          },
          lastModificationDate: {
            type: 'string',
          },
          metadata: {
            type: 'object',
          },
          retentionPolicy: {
            type: 'object',
          },
          permissions: {
            type: 'object',
          },
        },
      },
      spaceRef: {
        type: 'object',
        properties: {
          idProperties: {
            type: 'object',
          },
          expanded: {
            type: 'boolean',
          },
        },
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
    required: ['spaceKey', 'key'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/space/{spaceKey}/property/{key}',
    body: {
      key: 'body_key',
      value: 'value',
      version: 'version',
      space: 'space',
      spaceRef: 'spaceRef',
      _links: '_links',
      _expandable: '_expandable',
    },
  },
});
