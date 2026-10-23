import { defineTool } from '@usemcpkit/core';

export const ciUnleashGetFeatureFlagsUnleash = defineTool({
  name: 'ci:unleash:get_feature_flags_unleash',
  description: 'Get Unleash features. This endpoint is a no-op and always returns a 200 OK response.',
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
    path: '/feature_flags/unleash/{project_id}',
    query: ['instance_id', 'app_name'],
  },
});
