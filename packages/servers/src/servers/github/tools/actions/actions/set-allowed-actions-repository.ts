import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetAllowedActionsRepository = defineTool({
  name: 'actions:actions:set_allowed_actions_repository',
  description:
    'Set allowed actions and reusable workflows for a repository. Sets the actions and reusable workflows that are allowed in a repository. To use this endpoint, the repository permission policy for `allowed_actions` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for a repository."',
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
      github_owned_allowed: {
        type: 'boolean',
        description:
          'Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization.',
      },
      verified_allowed: {
        type: 'boolean',
        description:
          'Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators.',
      },
      patterns_allowed: {
        type: 'array',
        description:
          'Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/permissions/selected-actions',
    body: ['github_owned_allowed', 'verified_allowed', 'patterns_allowed'],
  },
});
