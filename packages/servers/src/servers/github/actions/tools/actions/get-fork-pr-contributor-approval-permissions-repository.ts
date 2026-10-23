import { defineTool } from '@usemcpkit/core';

export const actionsGetForkPrContributorApprovalPermissionsRepository = defineTool({
  name: 'actions:get_fork_pr_contributor_approval_permissions_repository',
  description:
    'Get fork PR contributor approval permissions for a repository. Gets the fork PR contributor approval policy for a repository.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval',
  },
});
