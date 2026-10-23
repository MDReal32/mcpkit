import { defineTool } from '@usemcpkit/core';

export const aiOrbitGetOrbitStatus = defineTool({
  name: 'ai:orbit:get_orbit_status',
  description:
    'Retrieve access and cluster health. Returns whether the user can access Orbit, plus cluster health. Always returns 200, regardless of access.',
  input: {
    type: 'object',
    properties: {
      response_format: {
        type: 'string',
        default: 'raw',
        enum: ['raw', 'llm'],
        description: 'Response format: raw or llm',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/orbit/status',
    query: ['response_format'],
  },
});
