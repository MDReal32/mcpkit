import { defineTool } from '@usemcpkit/core';

export const reposCreateDeploymentProtectionRule = defineTool({
  name: 'repos:create_deployment_protection_rule',
  description:
    'Create a custom deployment protection rule on an environment. Enable a custom deployment protection rule for an environment.',
  input: {
    type: 'object',
    properties: {
      environment_name: {
        type: 'string',
        description:
          'The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      integration_id: {
        type: 'integer',
        description: 'The ID of the custom app that will be enabled on the environment.',
      },
    },
    required: ['environment_name', 'repo', 'owner'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules',
    body: ['integration_id'],
  },
});
