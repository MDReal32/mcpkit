import { defineTool } from '@usemcpkit/core';

export const adminGeoCreateGeoNodeProxyGraphql = defineTool({
  name: 'admin:geo:create_geo_node_proxy_graphql',
  description:
    'Query the GraphQL endpoint of an existing Geo site. Queries the GraphQL endpoint of an existing Geo site.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the Geo node',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/geo/node_proxy/{id}/graphql',
  },
});
