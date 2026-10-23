import { defineTool } from '@usemcpkit/core';

export const ciUnleashListFeatureFlagsUnleashClientFeatures = defineTool({
  name: 'ci:unleash:list_feature_flags_unleash_client_features',
  description:
    'Get a list of features. Returns feature flags in the Unleash client features format used by GitLab feature flag clients.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'string',
        description: 'ID of the project.',
      },
      instance_id: {
        type: 'string',
        description: 'Instance ID of Unleash Client.',
      },
      app_name: {
        type: 'string',
        description: 'Application name of Unleash Client.',
      },
    },
    required: ['project_id'],
  },
  request: {
    method: 'GET',
    path: '/feature_flags/unleash/{project_id}/client/features',
    query: ['instance_id', 'app_name'],
  },
});
