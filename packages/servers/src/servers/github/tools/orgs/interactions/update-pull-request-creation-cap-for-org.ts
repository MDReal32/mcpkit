import { defineTool } from '@usemcpkit/core';

export const orgsInteractionsUpdatePullRequestCreationCapForOrg = defineTool({
  name: 'orgs:interactions:update_pull_request_creation_cap_for_org',
  description:
    'Update pull request creation cap for an org. Updates the pull request creation cap for an organization. The cap limits the total number of open pull requests a user can have across all public repositories in the organization at one time.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
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
    required: ['org', 'enabled'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/interaction-limits/pulls/creation-cap',
    body: ['enabled', 'max_open_pull_requests', 'include_drafts'],
  },
});
