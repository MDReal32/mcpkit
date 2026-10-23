import { defineTool } from '@usemcpkit/core';

export const reposCreateOrUpdateEnvironment = defineTool({
  name: 'repos:create_or_update_environment',
  description:
    'Create or update an environment. Create or update an environment with protection rules, such as required reviewers. For more information about environment protection rules, see "Environments."',
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
      wait_timer: {
        type: 'integer',
        description:
          'The amount of time to delay a job after the job is initially triggered. The time (in minutes) must be an integer between 0 and 43,200 (30 days).',
      },
      prevent_self_review: {
        type: 'boolean',
        description: 'Whether or not a user who created the job is prevented from approving their own job.',
      },
      reviewers: {
        type: 'array',
        description:
          'The people or teams that may review jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description: 'The type of reviewer.',
              enum: ['User', 'Team'],
            },
            id: {
              type: 'integer',
              description: 'The id of the user or team who can review the deployment',
            },
          },
        },
      },
      deployment_branch_policy: {
        type: 'object',
        description:
          'The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`.',
        properties: {
          protected_branches: {
            type: 'boolean',
            description:
              'Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`.',
          },
          custom_branch_policies: {
            type: 'boolean',
            description:
              'Whether only branches that match the specified name patterns can deploy to this environment. If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`.',
          },
        },
        required: ['protected_branches', 'custom_branch_policies'],
      },
    },
    required: ['owner', 'repo', 'environment_name'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/environments/{environment_name}',
    body: ['wait_timer', 'prevent_self_review', 'reviewers', 'deployment_branch_policy'],
  },
});
