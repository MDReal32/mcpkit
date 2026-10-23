import { defineTool } from '@usemcpkit/core';

export const reposDisableDeploymentProtectionRule = defineTool({
  name: 'repos:disable_deployment_protection_rule',
  description:
    'Disable a custom protection rule for an environment. Disables a custom deployment protection rule for an environment.',
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
      protection_rule_id: {
        type: 'integer',
        description: 'The unique identifier of the protection rule.',
      },
    },
    required: ['environment_name', 'repo', 'owner', 'protection_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  },
});
