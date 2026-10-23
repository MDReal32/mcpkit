import { defineTool } from '@usemcpkit/core';

export const reposReposGetCustomDeploymentProtectionRule = defineTool({
  name: 'repos:repos:get_custom_deployment_protection_rule',
  description:
    'Get a custom deployment protection rule. Gets an enabled custom deployment protection rule for an environment. Anyone with read access to the repository can use this endpoint. For more information about environments, see "Using environments for deployment."',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      environment_name: {
        type: 'string',
        description:
          'The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.',
      },
      protection_rule_id: {
        type: 'integer',
        description: 'The unique identifier of the protection rule.',
      },
    },
    required: ['owner', 'repo', 'environment_name', 'protection_rule_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}',
  },
});
