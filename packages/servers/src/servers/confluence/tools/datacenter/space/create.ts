import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceCreate = defineTool({
  name: 'datacenter:space:create',
  description:
    '[Data Center] Creates a new Space. Creates a new Space. The incoming Space does not include an id, but must include a Key and Name, and should include a Description.',
  input: {
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
        properties: {
          idProperties: {
            type: 'object',
          },
          expanded: {
            type: 'boolean',
          },
        },
      },
      description: {
        type: 'object',
      },
      homepage: {
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
      links: {
        type: 'object',
      },
      type: {
        type: 'string',
      },
      creator: {
        type: 'object',
        properties: {
          profilePicture: {
            type: 'object',
          },
          displayName: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
        },
      },
      creationDate: {
        type: 'string',
      },
      lastModifier: {
        type: 'object',
        properties: {
          profilePicture: {
            type: 'object',
          },
          displayName: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
        },
      },
      lastModificationDate: {
        type: 'string',
      },
      metadata: {
        type: 'object',
      },
      retentionPolicy: {
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
      permissions: {
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
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/space',
    body: [
      'id',
      'key',
      'name',
      'status',
      'icon',
      'description',
      'homepage',
      'links',
      'type',
      'creator',
      'creationDate',
      'lastModifier',
      'lastModificationDate',
      'metadata',
      'retentionPolicy',
      'permissions',
    ],
  },
});
