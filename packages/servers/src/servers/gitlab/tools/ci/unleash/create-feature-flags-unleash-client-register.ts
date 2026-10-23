import { defineTool } from '@usemcpkit/core';

export const ciUnleashCreateFeatureFlagsUnleashClientRegister = defineTool({
  name: 'ci:unleash:create_feature_flags_unleash_client_register',
  description: 'Register Unleash client. This endpoint is a no-op and always returns a 200 OK response.',
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
    method: 'POST',
    path: '/feature_flags/unleash/{project_id}/client/register',
    body: ['instance_id', 'app_name'],
  },
});
