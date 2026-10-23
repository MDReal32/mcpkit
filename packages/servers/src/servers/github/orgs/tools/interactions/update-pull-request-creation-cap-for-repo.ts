import { defineTool } from '@usemcpkit/core';

export const interactionsUpdatePullRequestCreationCapForRepo = defineTool({
  name: 'interactions:update_pull_request_creation_cap_for_repo',
  description:
    'Update pull request creation cap for a repository. Updates the pull request creation cap for a repository. The cap limits the number of open pull requests a user can have at one time.',
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
      enabled: {
        type: 'boolean',
        description: 'Whether the pull request creation cap is enabled',
      },
      max_open_pull_requests: {
        type: 'integer',
        description: 'The maximum number of open pull requests a user can have at one time',
      },
      include_drafts: {
        type: 'boolean',
        description: 'Whether draft pull requests count toward the pull request creation cap',
      },
    },
    required: ['owner', 'repo', 'enabled'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/interaction-limits/pulls/creation-cap',
    body: ['enabled', 'max_open_pull_requests', 'include_drafts'],
  },
});
