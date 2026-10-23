import { defineTool } from '@usemcpkit/core';

export const reposReposUpdateDeploymentBranchPolicy = defineTool({
  name: 'repos:repos:update_deployment_branch_policy',
  description: 'Update a deployment branch policy. Updates a deployment branch or tag policy for an environment.',
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
      name: {
        type: 'string',
        description: 'The name pattern that branches must match in order to deploy to the environment.',
      },
    },
    required: ['owner', 'repo', 'environment_name', 'branch_policy_id', 'name'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}',
    body: ['name'],
  },
});
