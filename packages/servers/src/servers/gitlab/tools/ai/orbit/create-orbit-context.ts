import { defineTool } from '@usemcpkit/core';

export const aiOrbitCreateOrbitContext = defineTool({
  name: 'ai:orbit:create_orbit_context',
  description:
    'Get entity context. Resolves one Orbit token to a PostgreSQL summary and, optionally, its graph neighborhood. Requests that reach token resolution count against the orbit_query rate limit; with expand, they run at most one billable graph query. Requires a JSON request body.',
  input: {
    type: 'object',
    properties: {
      tokens: {
        type: 'array',
        description: 'Exactly one token: Type[id], a GID, an instance URL, path!iid, path#iid, or path&iid (epic)',
        items: {
          type: 'string',
        },
      },
      expand: {
        type: 'boolean',
        description: 'Attach the graph neighborhood of the entity',
      },
      response_format: {
        type: 'string',
        description: 'Response format: raw or llm',
        default: 'raw',
        enum: ['raw', 'llm'],
      },
    },
    required: ['tokens'],
  },
  request: {
    method: 'POST',
    path: '/orbit/context',
    body: ['tokens', 'expand', 'response_format'],
  },
});
