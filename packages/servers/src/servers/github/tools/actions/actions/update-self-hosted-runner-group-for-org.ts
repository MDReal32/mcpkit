import { defineTool } from '@usemcpkit/core';

export const actionsActionsUpdateSelfHostedRunnerGroupForOrg = defineTool({
  name: 'actions:actions:update_self_hosted_runner_group_for_org',
  description:
    'Update a self-hosted runner group for an organization. Updates the `name` and `visibility` of a self-hosted runner group in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      runner_group_id: {
        type: 'integer',
        description: 'Unique identifier of the self-hosted runner group.',
      },
      name: {
        type: 'string',
        description: 'Name of the runner group.',
      },
      visibility: {
        type: 'string',
        description:
          'Visibility of a runner group. You can select all repositories, select individual repositories, or all private repositories.',
        enum: ['selected', 'all', 'private'],
      },
      allows_public_repositories: {
        type: 'boolean',
        description: 'Whether the runner group can be used by `public` repositories.',
        default: false,
      },
      restricted_to_workflows: {
        type: 'boolean',
        description:
          'If `true`, the runner group will be restricted to running only the workflows specified in the `selected_workflows` array.',
        default: false,
      },
      selected_workflows: {
        type: 'array',
        description:
          'List of workflows the runner group should be allowed to run. This setting will be ignored unless `restricted_to_workflows` is set to `true`.',
        items: {
          type: 'string',
          description:
            'Name of workflow the runner group should be allowed to run. Note that a ref, tag, or long SHA is required.',
        },
      },
      network_configuration_id: {
        type: 'string',
        description: 'The identifier of a hosted compute network configuration.',
      },
    },
    required: ['org', 'runner_group_id', 'name'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}',
    body: [
      'name',
      'visibility',
      'allows_public_repositories',
      'restricted_to_workflows',
      'selected_workflows',
      'network_configuration_id',
    ],
  },
});
