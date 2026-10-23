import { defineTool } from '@usemcpkit/core';

export const actionsAddRepoAccessToSelfHostedRunnerGroupInOrg = defineTool({
  name: 'actions:add_repo_access_to_self_hosted_runner_group_in_org',
  description:
    'Add repository access to a self-hosted runner group in an organization. Adds a repository to the list of repositories that can access a self-hosted runner group. The runner group must have `visibility` set to `selected`. For more information, see "Create a self-hosted runner group for an organization."',
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
      repository_id: {
        type: 'integer',
        description: 'The unique identifier of the repository.',
      },
    },
    required: ['org', 'runner_group_id', 'repository_id'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}',
  },
});
