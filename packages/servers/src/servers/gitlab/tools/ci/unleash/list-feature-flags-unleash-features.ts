import { defineTool } from '@usemcpkit/core';

export const ciUnleashListFeatureFlagsUnleashFeatures = defineTool({
  name: 'ci:unleash:list_feature_flags_unleash_features',
  description: '[Deprecated] Get a list of features (v2 client support). Deprecated in GitLab 15.6',
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
    path: '/feature_flags/unleash/{project_id}/features',
    query: ['instance_id', 'app_name'],
  },
});
