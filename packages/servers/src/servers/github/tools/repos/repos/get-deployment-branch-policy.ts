import { defineTool } from '@usemcpkit/core';

export const reposReposGetDeploymentBranchPolicy = defineTool({
  name: 'repos:repos:get_deployment_branch_policy',
  description: 'Get a deployment branch policy. Gets a deployment branch or tag policy for an environment.',
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
      branch_policy_id: {
        type: 'integer',
        description: 'The unique identifier of the branch policy.',
      },
    },
    required: ['owner', 'repo', 'environment_name', 'branch_policy_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
  },
});
