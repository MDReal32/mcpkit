import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceCreatePersonal = defineTool({
  name: 'datacenter:space:create_personal',
  description: '[Data Center] Creates the personal Space for self. Creates a personal space for self.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'object',
      },
      isPrivate: {
        type: 'boolean',
      },
      private: {
        type: 'boolean',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/space/personal',
    body: ['description', 'isPrivate', 'private'],
  },
});
