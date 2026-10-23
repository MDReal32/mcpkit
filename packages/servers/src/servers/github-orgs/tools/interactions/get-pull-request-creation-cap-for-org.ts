import { defineTool } from '@usemcpkit/core';

export const interactionsGetPullRequestCreationCapForOrg = defineTool({
  name: 'interactions:get_pull_request_creation_cap_for_org',
  description:
    'Get pull request creation cap for an org. Gets the pull request creation cap configuration for an organization. The cap limits the total number of open pull requests a user can have across all public repositories in the organization at one time.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/interaction-limits/pulls/creation-cap',
  },
});
