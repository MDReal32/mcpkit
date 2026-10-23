import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetForkPrContributorApprovalPermissionsRepository = defineTool({
  name: 'actions:actions:set_fork_pr_contributor_approval_permissions_repository',
  description:
    'Set fork PR contributor approval permissions for a repository. Sets the fork PR contributor approval policy for a repository.',
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
      approval_policy: {
        type: 'string',
        description: 'The policy that controls when fork PR workflows require approval from a maintainer.',
        enum: ['first_time_contributors_new_to_github', 'first_time_contributors', 'all_external_contributors'],
      },
    },
    required: ['owner', 'repo', 'approval_policy'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval',
    body: ['approval_policy'],
  },
});
