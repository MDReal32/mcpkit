import { defineTool } from '@usemcpkit/core';

export const metaFeaturesDeleteFeatures = defineTool({
  name: 'meta:features:delete_features',
  description:
    'Delete a feature. Deletes a feature gate. Returns the same response if the feature gate does not exist.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the feature flag.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'DELETE',
    path: '/features/{name}',
  },
});
