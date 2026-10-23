import { defineTool } from '@usemcpkit/core';

export const adminGeoCreateGeoFailures = defineTool({
  name: 'admin:geo:create_geo_failures',
  description:
    'Create a report of persistent verification failures. Creates a report on the primary site of resources that persistently fail verification on a secondary site.',
  input: {
    type: 'object',
    properties: {
      geo_node_id: {
        type: 'integer',
        description: 'The Geo node ID of the reporting secondary',
      },
      failures: {
        type: 'array',
        description: 'Persistent verification failures reported by the secondary',
        items: {
          type: 'object',
          properties: {
            error_type: {
              type: 'string',
              description: 'The type of verification error being reported',
            },
            replicable_name: {
              type: 'string',
              description: 'The replicable name of a replicator instance',
            },
            replicable_id: {
              type: 'integer',
              description: 'The model record ID',
            },
            verification_retry_count: {
              type: 'integer',
              description: 'The number of consecutive verification failures',
            },
            context: {
              type: 'object',
              description: 'Additional error-type-specific data',
            },
          },
          required: ['error_type', 'replicable_name', 'replicable_id', 'verification_retry_count'],
        },
      },
    },
    required: ['geo_node_id', 'failures'],
  },
  request: {
    method: 'POST',
    path: '/geo/failures',
    body: ['geo_node_id', 'failures'],
  },
});
