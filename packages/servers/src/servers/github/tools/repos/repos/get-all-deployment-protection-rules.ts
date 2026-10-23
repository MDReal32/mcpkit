import { defineTool } from '@usemcpkit/core';

export const reposReposGetAllDeploymentProtectionRules = defineTool({
  name: 'repos:repos:get_all_deployment_protection_rules',
  description:
    'Get all deployment protection rules for an environment. Gets all custom deployment protection rules that are enabled for an environment. Anyone with read access to the repository can use this endpoint. For more information about environments, see "Using environments for deployment."',
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
    },
    required: ['environment_name', 'repo', 'owner'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules',
  },
});
