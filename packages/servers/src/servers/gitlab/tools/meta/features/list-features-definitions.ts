import { defineTool } from '@usemcpkit/core';

export const metaFeaturesListFeaturesDefinitions = defineTool({
  name: 'meta:features:list_features_definitions',
  description: 'List all feature flag definitions. Lists all feature flag definitions.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/features/definitions',
  },
});
